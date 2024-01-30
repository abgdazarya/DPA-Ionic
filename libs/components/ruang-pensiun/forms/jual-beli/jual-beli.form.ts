import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { JualBeliDto, PostinganDto } from '@controllers/menu';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { FormValue } from '@shared';
import { IOption } from 'libs/components/common/select/option.type';
import { CameraService } from 'libs/services/common/camera.service';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Subscription, distinctUntilChanged, filter, tap } from 'rxjs';
import { UploadFotoRpModal } from '../../modals/upload-foto-rp/upload-foto-rp.modal';
import { UploadFotoAttachModal } from '../../modals/upload-foto-attach/upload-foto-attach.modal';
import { Capacitor } from '@capacitor/core';
import { MenuService } from 'libs/controllers/menu/services/menu.service';

@Component({
  selector: 'app-ruang-pensiun-jual-beli-form',
  templateUrl: './jual-beli.form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuangPensiunJualBeliForm implements OnInit, OnDestroy {
  subs = new Subscription();
  isMobile: boolean = false;

  @Input() public formGroup!: FormGroup;
  @Input() public dataKategori: any = {};
  @Input() public dataError: any = {};
  @Input() public dataJualBeli: any = {};
  @Input() public arrayJumlahGambar: any = [];
  @Input() public listKategori: any = [];

  @Output() public submitted: EventEmitter<FormValue<JualBeliDto>> =
    new EventEmitter<FormValue<JualBeliDto>>();
  @Output() public valueChanges: EventEmitter<JualBeliDto> =
    new EventEmitter<JualBeliDto>();

  public images: string[] = [''];
  public imagesFile: any[] = [null];

  public imagesJualBeli: string[] = ['', '', '', ''];
  public imagesFileJualBeli: any[] = [null, null, null, null];
  public fileSelected = 0;

  constructor(
    private cameraService: CameraService,
    private storageService: StorageService,
    public cdr: ChangeDetectorRef,
    public screenSizeService: ScreenSizeService,
    public navParams: NavParams,
    private menuService: MenuService,
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.dataKategori = this.navParams.get('dataKategori');
    this.dataError = this.navParams.get('dataError');
    this.listKategori = this.navParams.get('listKategori');
    this.dataJualBeli = this.navParams.get('dataJualBeli');
    this.arrayJumlahGambar = this.navParams.get('arrayJumlahGambar');
  }

  ngOnInit(): void {
    this.screenSizeService.isMobileResolution()
      ? (this.isMobile = true)
      : (this.isMobile = false);
    const func$ = this.formGroup.valueChanges
      .pipe(
        filter((res) => !!res),
        distinctUntilChanged(),
        tap((form) => {
          this.valueChanges.emit(form);
        })
      )
      .subscribe();

    this.subs.add(func$);

    if (this.arrayJumlahGambar) {
      if (this.arrayJumlahGambar.length == 0) {
        this.fetchGambar(0, this.dataJualBeli.gambarJualBeli['MAIN_IMAGE']);
      } else {
        for (var i = 0; i < this.arrayJumlahGambar.length; i++) {
          if (i == 0) {
            this.fetchGambar(0, this.dataJualBeli.gambarJualBeli['MAIN_IMAGE']);
          } else {
            this.fetchGambar(i, this.dataJualBeli.gambarJualBeli['IMAGE_' + i]);
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  isInputFilled(): boolean {
    return (
      this.formGroup.get('hargaBarang')?.value !== '' &&
      this.formGroup.get('hargaBarang')?.value !== 0
    );
  }

  textareaAddressValue: string = '';
  handleTextareaInput() {
    let value = this.formGroup.get('deskripsi')?.value;
    this.textareaAddressValue = value;
    const containsEnter = value.includes('\n');
    if (containsEnter) {
      this.textareaAddressValue = value.replace(/\n/g, '<br>');
    }
  }

  handleOpenUploadFotoModal = async (from: any, idx: any) => {
    if (from == 'gambar') {
      if (this.screenSizeService.isDesktopNativeResolution()) {
        this.getAttachmentGambar('photo', idx);
        return;
      }
      const modal = await this.modalCtrl.create({
        component: UploadFotoAttachModal,
        cssClass: 'modal-web ion-background-transparent',
        componentProps: {
          getAttachmentGambar: this.getAttachmentGambar,
          index: idx,
        },
      });
      modal.present();
      modal.onDidDismiss().then((data: any) => {});
    } else {
      if (this.screenSizeService.isDesktopNativeResolution()) {
        this.getAttachment('photo', idx);
        return;
      }
      const modal = await this.modalCtrl.create({
        component: UploadFotoRpModal,
        cssClass: 'modal-web ion-background-transparent',
        componentProps: {
          getAttachment: this.getAttachment,
          index: idx,
        },
      });
      modal.present();
      modal.onDidDismiss().then((data: any) => {});
    }
  };

  errorFile: any = '';
  public getAttachment = async (key: string, index: number) => {
    const gambarJualBeliArray = this.formGroup.get(
      'gambarJualBeli'
    ) as FormArray;

    if (index >= 0 && index < gambarJualBeliArray.length) {
      gambarJualBeliArray.removeAt(index);
      this.fileSelected -= 1;
    }

    // const file: any = await this.cameraService.takePhoto(key);

    // if (!file.type.startsWith('image/')) {
    //   this.errorFile = 'Tipe file bukan tipe gambar yang diizinkan.';
    //   this.cdr.markForCheck();
    //   setTimeout(() => {
    //     this.errorFile = '';
    //     this.cdr.markForCheck();
    //   }, 3000);
    //   return;
    // }
    const file:any = await this.cameraService.takePhoto(key);
    if (!file) return;

    const fileRes: any = await this.cameraService.resizeImage(file, 512);

    // Tambahkan kembali elemen di index yang terpilih dengan fileRes baru
    gambarJualBeliArray.insert(index, this.fb.control(fileRes));

    this.imagesFileJualBeli[index] = fileRes;
    this.imagesJualBeli[index] = URL.createObjectURL(fileRes);

    this.fileSelected += this.imagesJualBeli[index] ? 1 : 0;
    if (!this.screenSizeService.isDesktopNativeResolution()) {
      this.modalCtrl.dismiss();
    }
    this.cdr.markForCheck();
  };

  public getAttachmentGambar = async (key: string, index: number) => {
    const gambar = this.formGroup.get('gambar') as FormArray;

    if (gambar.length > 0 && gambar.at(0).value === null) {
      gambar.removeAt(0);
    }

    // const file = await this.cameraService.takePhoto(key);
    // if (!file) {
    //   this.errorFile = 'Tipe file bukan tipe gambar yang diizinkan.';
    //   this.cdr.markForCheck();
    //   setTimeout(() => {
    //     this.errorFile = '';
    //     this.cdr.markForCheck();
    //   }, 3000);
    //   return;
    // }
    const file:any = await this.cameraService.takePhoto(key);
    if (!file) return;

    const fileRes: any = await this.cameraService.resizeImage(file, 512);

    this.imagesFile[index] = fileRes;
    this.images[index] = URL.createObjectURL(fileRes);
    gambar.push(this.fb.control(fileRes));
    if (!this.screenSizeService.isDesktopNativeResolution()) {
      this.modalCtrl.dismiss();
    }
    this.cdr.markForCheck();
  };

  generateOptionKategori = (arr: any): IOption[] => {
    const temp: IOption[] = [];
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        temp.push({
          id: item.idKategori || '',
          label: item.judulKategori || '',
        });
      }
    }

    if (temp.length == 0) {
      temp.push({
        id: 'KRP000000001',
        label: 'Aktivitas Pensiun',
      });
      temp.push({
        id: 'KRP000000002',
        label: 'Jual Beli',
      });
    }
    return temp;
  };

  loadingGetImg: boolean = false;
  async fetchGambar(index: any = 0, url: any) {
    if (url && url.includes('http://')) {
      url = url.replace('http://', 'https://');
    }

    this.loadingGetImg = true;
    const gambarJualBeliArray = this.formGroup.get(
      'gambarJualBeli'
    ) as FormArray;

    if (
      gambarJualBeliArray.length > 0 &&
      gambarJualBeliArray.at(0).value === null
    ) {
      gambarJualBeliArray.removeAt(0);
    }

    const payload = {
      gambarUrl: url,
    };

    await this.menuService.getBase64(payload).subscribe(async (res) => {
      if (res) {
        const file = await this.cameraService.convertToFileFromBase64(res.data);
        const fileRes: any = await this.cameraService.resizeImage(file, 512);

        this.imagesFileJualBeli[index] = fileRes;
        this.imagesJualBeli[index] = URL.createObjectURL(fileRes);
        gambarJualBeliArray.push(this.fb.control(fileRes));

        this.fileSelected += this.imagesJualBeli[index] ? 1 : 0;
        this.cdr.markForCheck();
      }
    });
    this.loadingGetImg = false;
  }

  errorMsg: any = '';
  public async submit(): Promise<void> {
    this.formGroup.get('deskripsi')?.setValue(this.textareaAddressValue);
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const response: FormValue<PostinganDto> = {
      value: { ...this.formGroup.value, idProfilDpa },
      isValid: this.formGroup.valid,
    };
    this.submitted.emit(response);

    // this.store.dispatch(EditProfile({ payload }));
    // const interaction = this.interactionResponse$
    //   .pipe(
    //     filter((res) => !!res),
    //     tap((interaction: InteractionState | null | undefined) => {
    //       if (interaction!.type === InteractionType.SUCCEED) {
    //         // this.modalCtrl.dismiss({ success: true });
    //         this.handleOpenSuccessModal();
    //       }
    //       if (
    //         interaction!.type === InteractionType.FAILED ||
    //         interaction!.type === InteractionType.SUCCEED
    //       ) {
    //         this.resetState();
    //       }
    //     })
    //   )
    //   .subscribe();
    // this.subscribtions.add(interaction);
  }
}
