import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  KategoriRuangPensiun,
  PostinganDto,
  PostinganFormController,
} from '@controllers/menu';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  DataResponse,
  FormValue,
  INITIAL_INTERACTION_STATE,
  InteractionState,
  InteractionType,
} from '@shared';
import { MenuInteractionRepository, MenuRepository } from '@stores/menu';
import {
  InsertPostingan,
  InsertPostinganReset,
} from 'libs/controllers/menu/action/commands/insert-postingan';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { Observable, Subscription, filter, map, take, tap } from 'rxjs';
import { SuccessPostModal } from '../success-post/success-post.modal';
import { CustomPopupComponent } from 'libs/components/common/custom-popup/custom-popup.component';
import { LoginData, VerifyReferralCode } from '@controllers/auth';
import { VerifyReferralCodeDto } from 'libs/controllers/auth/dtos/verify-referral-code.dto';
import { MenuService } from 'libs/controllers/menu/services/menu.service';

@Component({
  selector: 'app-ruang-pensiun-postingan-modal',
  templateUrl: './postingan.modal.html',
  providers: [
    PostinganFormController,
    MenuRepository,
    MenuInteractionRepository,
  ],
})
export class RuangPensiunPostinganModal {
  private subscribtions = new Subscription();

  public formGroup!: FormGroup;
  public dataKategori: any;
  public kategoriPensiun: any = [];
  public dataPostingan: any = {};
  public interactionResponse$: Observable<InteractionState>;
  public interactionType = InteractionType;
  public errorResponse$: Observable<string | undefined | null>;
  public successResponse$: Observable<string | undefined | null>;
  public successMessage: string = '';
  haveImage: boolean = false;
  isCreated: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    formController: PostinganFormController,
    private repo: MenuRepository,
    private interactionRepo: MenuInteractionRepository,
    public store: Store,
    private menuService: MenuService,
    public screenSizeService: ScreenSizeService,
    public navParams: NavParams
  ) {
    this.dataKategori = this.navParams.get('dataKategori');
    this.dataPostingan = this.navParams.get('dataPostingan');
    this.formGroup = formController.create();
    if (this.dataKategori) {
      this.formGroup.get('kategori')?.setValue(this.dataKategori.idKategori);
    }
    this.kategoriPensiun = this.navParams.get('kategoriPensiun');

    if (this.dataPostingan && this.formGroup) {
      this.isCreated = false;
      this.formGroup
        .get('judulThread')
        ?.setValue(this.dataPostingan.judulThread);
      this.formGroup.get('deskripsi')?.setValue(this.dataPostingan.deskripsi);
      this.formGroup
        .get('kategori')
        ?.setValue(this.dataPostingan.idKategoriRuangPensiun);
    }

    this.interactionResponse$ =
      this.interactionRepo.postTambahPostinganInteraction$();
    this.errorResponse$ = this.interactionRepo
      .postTambahPostinganInteraction$()
      .pipe(map((res) => res?.error));
    this.successResponse$ = this.interactionRepo
      .postTambahPostinganInteraction$()
      .pipe(map((res) => res?.success));

    this.formGroup.valueChanges.subscribe((res) => {
      if (res.gambar) {
        res.gambar.forEach((e: any) => {
          if (e != null) {
            this.haveImage = true;
          }
        });
      }
    });
  }

  public async handleClose(succeed?: boolean) {
    this.modalCtrl.dismiss({ succeed });
  }

  public async handleBack() {
    this.modalCtrl.dismiss({ back: true });
  }

  reduceImage = (arr: any) => {
    arr.pop();
    return arr;
  };

  loadingPost: boolean = false;
  dataError:any = {};
  public handleSubmit(formValue: FormValue<PostinganDto>) {
    this.loadingPost = true;
    // this.store.dispatch(InsertPostingan({ payload: formValue.value }));

    const payload = {
      ...formValue.value,
      gambar: this.reduceImage(formValue.value?.gambar || []),
      kategori: this.dataKategori.idKategori,
      idRuangPensiun: this.dataPostingan
        ? this.dataPostingan.idRuangPensiun
        : null,
    };
    this.menuService.insertPostingan(payload).subscribe(
      async (res) => {
        this.loadingPost = false;
        if (this.screenSizeService.isDesktopResolution()) {
          this.handleClose();
        }

        
        const modal = await this.modalCtrl.create({
          component: SuccessPostModal,
          componentProps: {
            title: this.isCreated
              ? 'Tulisan kamu berhasil dibuat'
              : 'Tulisan kamu berhasil diperbarui',
            desc: 'Selanjutnya tulisanmu dalam peninjauan oleh tim kami dan akan diproses secepatnya.',
            status: 'oke',
          },
          cssClass: this.screenSizeService.isMobileResolution()
            ? 'modal-web ion-background-transparent'
            : 'modal-web ion-background-white',
        });
        modal.present();

        modal.onDidDismiss().then(({ data }) => {
          this.handleClose();
        });
      },
      async (err) => {
        this.loadingPost = false;
        if(err.error.data) {
          this.dataError = err.error.data;
          return;
        }
        const modal = await this.modalCtrl.create({
          component: SuccessPostModal,
          componentProps: {
            title: 'Tulisan kamu gagal dibuat',
            desc: err.error ? err.error.message:'Ulangi beberapa saat lagi atau hubungi admin DPA.',
            status: 'error',
          },
          cssClass: this.screenSizeService.isMobileResolution()
            ? 'modal-web ion-background-transparent'
            : 'modal-web ion-background-white',
        });
        modal.present();
      }
    );

    // this.interactionResponse$.subscribe(async (res) => {
    //

    //   if (res?.type === InteractionType.SUCCEED) {
    //     if(this.screenSizeService.isDesktopResolution()) {
    //       this.handleClose();
    //     }

    //     const modal = await this.modalCtrl.create({
    //       component: SuccessPostModal,
    //       componentProps: {
    //         title: 'Tulisan kamu berhasil dibuat',
    //         desc: 'Selanjutnya tulisanmu dalam peninjauan oleh tim kami dan akan diproses secepatnya.',
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
    //   } else if (res?.type === InteractionType.FAILED) {
    //     const modal = await this.modalCtrl.create({
    //       component: SuccessPostModal,
    //       componentProps: {
    //         title: 'Tulisan kamu gagal dibuat',
    //         desc: 'Ulangi beberapa saat lagi atau hubungi admin DPA.',
    //         status: 'error'
    //       },
    //       cssClass: this.screenSizeService.isMobileResolution()
    //         ? 'modal-web ion-background-transparent'
    //         : 'modal-web ion-background-white'
    //     });
    //     modal.present();
    //   }
    // });
  }

  ngOnInit(): void {
    const resetFunction = (success: boolean = false) => {
      setTimeout(() => {
        this.store.dispatch(
          InsertPostinganReset({ response: INITIAL_INTERACTION_STATE })
        );

        if (success) {
          this.handleClose(true);
        }
      }, 2000);
    };

    const interaction = this.interactionRepo
      .getPostinganRuangPensiunManage$()
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
