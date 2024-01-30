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
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { PostinganDto } from '@controllers/menu';
import { ModalController, NavParams } from '@ionic/angular';
import { FormValue } from '@shared';
import { IOption } from 'libs/components/common/select/option.type';
import { ProfileUploadFotoModal } from 'libs/components/profile/modals/upload-foto/upload-foto.modal';
import { CameraService } from 'libs/services/common/camera.service';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Subscription, distinctUntilChanged, filter, tap } from 'rxjs';
import { UploadFotoRpModal } from '../../modals/upload-foto-rp/upload-foto-rp.modal';
import { Capacitor } from '@capacitor/core';
import { MenuService } from 'libs/controllers/menu/services/menu.service';

@Component({
  selector: 'app-ruang-pensiun-postingan-form',
  templateUrl: './postingan.form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuangPensiunPostinganForm implements OnInit, OnDestroy {
  subs = new Subscription();
  isMobile: boolean = false;

  @Input() public formGroup!: FormGroup;
  @Input() public dataKategori: any = {};
  @Input() public dataError: any = {};
  @Input() public dataPostingan: any = {};
  @Input() public kategoriPensiun: any = [];

  @Output() public nextPage: EventEmitter<any> = new EventEmitter<
    FormValue<PostinganDto>
  >();

  @Output() public submitted: EventEmitter<FormValue<PostinganDto>> =
    new EventEmitter<FormValue<PostinganDto>>();
  @Output() public valueChanges: EventEmitter<PostinganDto> =
    new EventEmitter<PostinganDto>();

  public images: string[] = [''];
  public imagesFile: any[] = [null];
  public fileSelected = 0;
  byPassedHTMLString: any;

  constructor(
    private cameraService: CameraService,
    private storageService: StorageService,
    public screenSizeService: ScreenSizeService,
    public cdr: ChangeDetectorRef,
    public navParams: NavParams,
    private fb: FormBuilder,
    private menuService: MenuService,
    private modalCtrl: ModalController
  ) {
    this.dataKategori = this.navParams.get('dataKategori');
    this.dataError = this.navParams.get('dataError');
    this.kategoriPensiun = this.navParams.get('kategoriPensiun');
    this.dataPostingan = this.navParams.get('dataPostingan');
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
    if (this.dataPostingan) {
      if (this.dataPostingan.gambar) {
        this.fetchGambar();
      }
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   // if (this.formGroup) {
  //   //   this.valueChanges.emit(this.formGroup);
  //   // }
  // }

  handleOpenUploadFotoModal = async (idx: any) => {
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
  };

  errorFile: any = '';
  public getAttachment = async (key: string, index: any) => {
    const gambarArray = (await this.formGroup.get('gambar')) as FormArray;
    // const file: any = await this.cameraService.takePhoto(key);
    // console.log(file);
    
    // if(file) {
    //   if (!file.type.startsWith('image/')) {
    //     this.errorFile = 'Tipe file bukan tipe gambar yang diizinkan.';
    //     this.cdr.markForCheck();
    //     setTimeout(() => {
    //       this.errorFile = '';
    //       this.cdr.markForCheck();
    //     }, 3000);
    //     return;
    //   }
    // }
    const file:any = await this.cameraService.takePhoto(key);
    if (!file) return;

    while (gambarArray.length !== 0) {
      gambarArray.removeAt(0);
    }

    gambarArray.setControl(0, new FormControl(file));

    if (Capacitor.getPlatform() == 'web') {
      const fileRes: any = await this.cameraService.resizeImage(file, 512);

      this.imagesFile[index] = fileRes;
      this.images[index] = URL.createObjectURL(fileRes);
      gambarArray.push(this.fb.control(fileRes));

      this.fileSelected += this.images[index] ? 1 : 0;
      if (!this.screenSizeService.isDesktopNativeResolution()) {
        this.modalCtrl.dismiss();
      }
      this.cdr.markForCheck();
    } else {
      this.imagesFile[index] = file;
      this.images[index] = URL.createObjectURL(file);
      gambarArray.push(this.fb.control(file));

      this.fileSelected += this.images[index] ? 1 : 0;
      if (!this.screenSizeService.isDesktopNativeResolution()) {
        this.modalCtrl.dismiss();
      }
      this.cdr.markForCheck();
    }
  };

  loadingGetImg: boolean = false;
  async fetchGambar(index: any = 0) {
    this.loadingGetImg = true;
    const gambarArray = (await this.formGroup.get('gambar')) as FormArray;

    if (
      this.dataPostingan.gambar &&
      this.dataPostingan.gambar.includes('http://')
    ) {
      this.dataPostingan.gambar = this.dataPostingan.gambar.replace(
        'http://',
        'https://'
      );
    }

    const payload = {
      gambarUrl: this.dataPostingan.gambar,
    };

    this.menuService.getBase64(payload).subscribe(async (res) => {
      if (res) {
        const file: any = await this.cameraService.convertToFileFromBase64(
          res.data
        );

        gambarArray.setControl(0, new FormControl(file));
        const fileRes: any = await this.cameraService.resizeImage(file, 512);

        this.imagesFile[index] = fileRes;
        this.images[index] = URL.createObjectURL(fileRes);
        gambarArray.push(this.fb.control(fileRes));

        this.fileSelected += this.images[index] ? 1 : 0;
        this.cdr.markForCheck();
      }
    });
    this.loadingGetImg = false;
  }

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

  errorMsg: any = '';
  showNextPage: boolean = false;
  public async submit(): Promise<void> {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const response: FormValue<PostinganDto> = {
      value: { ...this.formGroup.value, idProfilDpa },
      isValid: this.formGroup.valid,
    };
    this.submitted.emit(response);
  }
}
