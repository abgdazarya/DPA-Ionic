import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  PostinganDto,
  JualBeliFormController,
  JualBeliDto,
} from '@controllers/menu';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  FormValue,
  INITIAL_INTERACTION_STATE,
  InteractionState,
  InteractionType,
} from '@shared';
import { MenuInteractionRepository, MenuRepository } from '@stores/menu';
import success from 'icons/warnings/success';
import {
  InsertJualBeli,
  InsertJualBeliReset,
} from 'libs/controllers/menu/action/commands/insert-jual-beli';
import { InsertPostingan } from 'libs/controllers/menu/action/commands/insert-postingan';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { Observable, Subscription, map, tap } from 'rxjs';
import { SuccessPostModal } from '../success-post/success-post.modal';
import { MenuService } from 'libs/controllers/menu/services/menu.service';

@Component({
  selector: 'app-ruang-pensiun-jual-beli-modal',
  templateUrl: './jual-beli.modal.html',
  providers: [
    JualBeliFormController,
    MenuRepository,
    MenuInteractionRepository,
  ],
})
export class RuangPensiunJualBeliModal implements OnInit, OnDestroy {
  private subscribtions = new Subscription();
  public formGroup!: FormGroup;
  public dataKategori:any;
  public listKategori: any = [];
  public dataJualBeli: any = {};
  public arrayJumlahGambar: any = [];
  public interactionResponse$: Observable<InteractionState | undefined | null>;
  public interactionType = InteractionType;
  public errorResponse$: Observable<string | undefined | null>;
  public successResponse$: Observable<string | undefined | null>;
  public successMessage: string = '';
  haveImage:boolean = false;
  isCreated:boolean = true;

  constructor(
    private modalCtrl: ModalController,
    formController: JualBeliFormController,
    private repo: MenuRepository,
    private interactionRepo: MenuInteractionRepository,
    public store: Store,
    public navParams : NavParams,
    private menuService: MenuService,
    public screenSizeService:  ScreenSizeService
  ) {
    this.formGroup = formController.create();
    this.dataKategori = this.navParams.get('dataKategori');
    this.listKategori = this.navParams.get('listKategori');
    this.dataJualBeli = this.navParams.get('dataJualBeli');
    this.arrayJumlahGambar = this.navParams.get('arrayJumlahGambar');
    this.formGroup = formController.create();
    if(this.dataKategori) {
      this.formGroup.get('kategori')?.setValue(this.dataKategori.idKategori);
    }
    
    if(this.dataJualBeli && this.formGroup) {
      this.isCreated = false;
      this.formGroup.get('judulThread')?.setValue(this.dataJualBeli.judulThread);
      this.formGroup.get('hargaBarang')?.setValue(this.dataJualBeli.hargaBarang);
      this.formGroup.get('deskripsi')?.setValue(this.normalizeTextareaInput(this.dataJualBeli.deskripsi));
      this.formGroup.get('alamat')?.setValue(this.dataJualBeli.alamat);
      this.formGroup.get('pinMaps')?.setValue(this.dataJualBeli.pinMaps);
      this.formGroup.get('linkPenjualan')?.setValue(this.dataJualBeli.linkPenjualan);
      this.formGroup.get('kategori')?.setValue(this.dataJualBeli.idKategoriRuangPensiun);
    }
    
    this.interactionResponse$ =
      this.interactionRepo.postTambahJualBeliInteraction$();
    this.errorResponse$ = this.interactionRepo
      .postTambahJualBeliInteraction$()
      .pipe(map((res) => res?.error));
    this.successResponse$ = this.interactionRepo
      .postTambahJualBeliInteraction$()
      .pipe(map((res) => res?.success));
    
    this.formGroup.valueChanges.subscribe(res => {
      if(res.gambarJualBeli) {
        res.gambarJualBeli.forEach((e:any) => {
          if(e != null) {
            this.haveImage = true;
          }
        });
      }
    })
  }

  normalizeTextareaInput(input: string): string {
    return input.replace(/<br\s*\/?>/g, '\n');
  }

  public async handleClose(succeed?: boolean) {
    await this.modalCtrl.dismiss({ succeed });
  }

  public async handleBack() {
    await this.modalCtrl.dismiss({ back: true });
  }

  loadingPost:boolean = false;
  dataError:any = {};
  public async handleSubmit(formValue: FormValue<JualBeliDto>) {
    this.loadingPost = true;
    const payload = {
      ...formValue.value,
      kategori: this.dataKategori.idKategori,
      idRuangPensiun: this.dataJualBeli ? this.dataJualBeli.idRuangPensiun:null
    }
    this.menuService.insertJualBeli(payload).subscribe(async res => {
      this.loadingPost = false;
      if(this.screenSizeService.isDesktopResolution()) {
        this.handleClose();
      }
      
      const modal = await this.modalCtrl.create({
        component: SuccessPostModal,
        componentProps: {
          title: this.isCreated ? 'Barang kamu berhasil dibuat':'Barang kamu berhasil diperbarui',
          desc: 'Selanjutnya barang kamu dalam peninjauan oleh tim kami dan akan diproses secepatnya.',
          status: 'oke'
        },
        cssClass: this.screenSizeService.isMobileResolution()
          ? 'modal-web ion-background-transparent'
          : 'modal-web ion-background-white'
      });
      modal.present();

      modal.onDidDismiss().then(({ data }) => {    
        this.handleClose();
      });
    }, async err => {
      this.loadingPost = false;
      if(err.error.data) {
        this.dataError = err.error.data;
        return;
      }
      const modal = await this.modalCtrl.create({
        component: SuccessPostModal,
        componentProps: {
          title: 'Barang kamu gagal dibuat',
          desc: err.error ? err.error.message:'Ulangi beberapa saat lagi atau hubungi admin DPA.',
          status: 'error'
        },
        cssClass: this.screenSizeService.isMobileResolution()
          ? 'modal-web ion-background-transparent'
          : 'modal-web ion-background-white'
      });
      modal.present();
    })

    // this.store.dispatch(InsertJualBeli({ payload: formValue.value }));

    // this.successResponse$.subscribe(async res => {
    //   if(res) {
    //     if(this.screenSizeService.isDesktopResolution()) {
    //       this.handleClose();
    //     }
        
    //     const modal = await this.modalCtrl.create({
    //       component: SuccessPostModal,
    //       componentProps: {
    //         title: 'Barang kamu berhasil dibuat',
    //         desc: 'Selanjutnya barang kamu dalam peninjauan oleh tim kami dan akan diproses secepatnya.',
    //         status: 'oke'
    //       },
    //       cssClass: this.screenSizeService.isMobileResolution()
    //         ? 'modal-web ion-background-transparent'
    //         : 'modal-web ion-background-white'
    //     });
    //     modal.present();
  
    //     modal.onDidDismiss().then(({ data }) => {    
    //       this.handleClose();
    //     });
    //   } else {
    //     const modal = await this.modalCtrl.create({
    //       component: SuccessPostModal,
    //       componentProps: {
    //         title: 'Barang kamu gagal dibuat',
    //         desc: 'Ulangi beberapa saat lagi atau hubungi admin DPA.',
    //         status: 'error'
    //       },
    //       cssClass: this.screenSizeService.isMobileResolution()
    //         ? 'modal-web ion-background-transparent'
    //         : 'modal-web ion-background-white'
    //     });
    //     modal.present();
    //   }
    // })
  }

  ngOnInit(): void {
    const resetFunction = (success: boolean = false) => {
      setTimeout(() => {
        this.store.dispatch(
          InsertJualBeliReset({ response: INITIAL_INTERACTION_STATE })
        );

        if (success) {
          this.handleClose(true);
        }
      }, 2000);
    };

    const interaction = this.interactionRepo
      .getJualBeliRuangPensiunManage$()
      .pipe(
        tap((interaction: InteractionState) => {
          switch (interaction.type) {
            case InteractionType.FAILED:
              resetFunction();
              break;
            case InteractionType.SUCCEED:
              resetFunction(true);
              break;

            default:
              break;
          }
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }
}
