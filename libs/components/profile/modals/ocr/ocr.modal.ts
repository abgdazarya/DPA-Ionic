import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AreaMapping,
  BaseProfile,
  DetailProfile,
  EditProfile,
  EditProfileInteractionReset,
  EditProfileReset,
  IdCardInfo,
  ProfileFormController,
  UserDetail,
} from '@controllers/profile';
import { ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  DataResponse,
  DataResponseArray,
  INITIAL_INTERACTION_STATE,
  InteractionState,
  InteractionType,
  encryptContent,
} from '@shared';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import * as dayjs from 'dayjs';
import { IOption } from 'libs/components/common/select/option.type';
import { UpdateSucceedModal } from 'libs/components/common/update-succeed/update-succeed.modal';
import {
  OcrKtp,
  OcrKtpInteractionReset,
} from 'libs/controllers/profile/action/command/ocr-ktp';
import { AreaMappingDto } from 'libs/controllers/profile/dtos/area-maping.dto';
import { AreaMappingData } from 'libs/controllers/profile/models/area-mapping.model';
import { OCRTokenData } from 'libs/controllers/profile/models/ocr-token.model';
import { OCRData } from 'libs/controllers/profile/models/ocr.model';
import { ProfileMasterService } from 'libs/controllers/profile/services/profile-master.service';
import { CameraService } from 'libs/services/common/camera.service';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { ProfileState } from 'libs/stores/profile/states/profile.state';
import {
  combineLatest,
  filter,
  map,
  Observable,
  of,
  Subscription,
  take,
  tap,
} from 'rxjs';
var domtoimage = require('dom-to-image-more');
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from '@awesome-cordova-plugins/file-transfer/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { ProfileUploadFotoModal } from '../upload-foto/upload-foto.modal';
import { OcrToken } from 'libs/controllers/profile/action/command/ocr-token';
import { ProfileDto } from 'libs/controllers/profile/dtos/profile.dto';
import { environment } from 'src/environments/environment';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { UpdateFailedModal } from 'libs/components/common/update-failed/update-failed.modal';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { AuthUserNumberModal } from '@components/auth';
import {
  GetNoPeserta,
  GetNoPesertaDto,
  NeedVerification,
} from '@controllers/auth';

const dateFormat = (str: string | any = ''): string => {
  const arr = str?.split?.('-');
  if (arr?.[0]?.length < 4) {
    return dayjs(arr.reverse().join('-')).format('YYYY-MM-DD');
  }
  return dayjs(str).format('DD-MM-YYYY');
};

const getValueFromObj = (
  target: string,
  arr: AreaMappingData[],
  targetKey: string = 'kodeAlamat'
): any => {
  if (arr) {
    const length = arr.length;
    for (let i = 0; i < length; i++) {
      const item: AreaMappingData = arr[i];
      if (item[targetKey]?.toLowerCase?.() == target?.toLowerCase?.()) {
        return item.namaAlamat;
      }
    }
  }
  return target;
};

interface isLoadingLov {
  provinsi: boolean;
  kabupaten: boolean;
  kecamatan: boolean;
  kelurahan: boolean;
  [key: string]: boolean;
}
@Component({
  selector: 'profile-ocr-modal',
  templateUrl: './ocr.modal.html',
  styleUrls: ['./ocr.modal.scss'],
  providers: [
    ProfileFormController,
    ProfileRepository,
    ProfileInteractionRepository,
    AuthRepository,
    AuthInteractionRepository,
  ],
})
export class ProfileOcrModal implements OnInit {
  public formGroup: FormGroup;
  @Input() detailData: DetailProfile | null | undefined = undefined;
  @Input() infoUser: BaseProfile | null | undefined = undefined;
  @Input() ocrToken: OCRTokenData | null | undefined = undefined;

  public response$: Observable<DataResponse<DetailProfile> | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;
  public isLoading$: Observable<boolean | undefined | null>;
  public isLoadingToken$: Observable<boolean | undefined | null>;

  public interactionType = InteractionType;
  public errorResponse$: Observable<string | undefined | null>;
  private subscribtions = new Subscription();
  public responseOcrKtp$: Observable<DataResponse<OCRData> | undefined | null>;
  public tempFileKtp: IdCardInfo = {};
  private tempFileKtpWatermark: any = null;
  public tempFileKtpWatermarkRender: any = null;
  errorSavedData: any = '';

  public responseProvinsi$: Observable<
    DataResponseArray<AreaMappingData> | undefined | null
  >;
  public responseKabupaten$: Observable<
    DataResponseArray<AreaMappingData> | undefined | null
  >;
  public responseKecamatan$: Observable<
    DataResponseArray<AreaMappingData> | undefined | null
  >;
  public responseDesa$: Observable<
    DataResponseArray<AreaMappingData> | undefined | null
  >;
  public responseOcrToken$: Observable<OCRTokenData | undefined | null>;
  public errorResponseOcr$: Observable<string | undefined | null>;

  public tempOcrData: OCRData | null = null;
  public tempBioData: ProfileDto | null = null;
  public isUseOcrData: boolean = false;

  private arrResProvinsi: AreaMappingData[] = [];
  private arrResKabupaten: AreaMappingData[] = [];
  private arrResKecamatan: AreaMappingData[] = [];
  private arrResDesa: AreaMappingData[] = [];

  private fotoKtp: any = null;
  fotoKtpExist: any = null;
  errorSaveData: boolean = false;
  isOpen: boolean = false

  public optionJenisKelamin: IOption[] = [
    { id: 'Laki-laki', label: 'Laki-laki' },
    { id: 'Perempuan', label: 'Perempuan' },
  ];
  public optionStatus: IOption[] = [
    { id: 'Belum Kawin', label: 'Belum Kawin' },
    { id: 'Kawin', label: 'Kawin' },
    { id: 'Cerai Hidup', label: 'Cerai Hidup' },
    { id: 'Cerai Mati', label: 'Cerai Mati' },
  ];

  public isLoadingLov: isLoadingLov = {
    provinsi: false,
    kabupaten: false,
    kecamatan: false,
    kelurahan: false,
  };
  isMobile: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    formController: ProfileFormController,
    private store: Store<ProfileState>,
    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    private router: Router,
    public screenSizeService: ScreenSizeService,
    private toastController: ToastController,
    private cameraService: CameraService,
    private fileTransfer: FileTransfer,
    private http: HttpClient,
    private file: File,
    private device: Device,
    private androidPermissions: AndroidPermissions,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService,
    private authRepo: AuthRepository
  ) {
    this.formGroup = formController.create();
    this.response$ = this.profileRepository.postEditProfilData$();
    this.interactionResponse$ =
      this.profileInteractionRepository.postEditProfileInteraction$();
    this.isLoading$ = this.interactionResponse$.pipe(map((e) => e?.isLoading));
    this.errorResponseOcr$ = this.profileInteractionRepository
      .ocrUploadKtpInteraction$()
      .pipe(map((e) => e?.error || ''));

    this.errorResponse$ = this.profileInteractionRepository
      .postEditProfileInteraction$()
      .pipe(map((res) => res?.error || ''));
    this.isLoadingToken$ = this.profileInteractionRepository
      .getOcrTokenInteraction$()
      .pipe(map((e) => e?.isLoading));
    this.responseOcrToken$ = this.profileRepository.getOcrToken$();
    this.responseOcrKtp$ = this.profileRepository.ocrUploadKtp$();
    this.responseProvinsi$ = this.profileRepository.areaMapping$('provinsi');
    this.responseKabupaten$ = this.profileRepository.areaMapping$('kabupaten');
    this.responseKecamatan$ = this.profileRepository.areaMapping$('kecamatan');
    this.responseDesa$ = this.profileRepository.areaMapping$('kelurahan');
  }

  ngOnInit(): void {
    this.screenSizeService.isMobileResolution()
      ? (this.isMobile = true)
      : (this.isMobile = false);

    const interaction = this.interactionResponse$
      .pipe(
        filter((res) => !!res),
        tap((interaction: InteractionState | null | undefined) => {
          if (interaction?.type == InteractionType.FAILED) {
            if (interaction?.code === '04') {
              this.handleErrorNikSubmit();
            }
          } else if (interaction!.type === InteractionType.SUCCEED) {
            if (interaction?.code === '00') {
              this.handleOpenSuccessModal(true);
              this.handleFetchNoPeserta();
            }

            if (interaction?.code === '02') {
              this.handleOpenSuccessModal(false);
            }
          }
          if (
            interaction!.type === InteractionType.FAILED ||
            interaction!.type === InteractionType.SUCCEED
          ) {
            this.resetState();
          }
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);

    this.store.dispatch(OcrKtpInteractionReset({}));
    this.store.dispatch(EditProfileInteractionReset({ response: {} }));
    this.store.dispatch(EditProfileReset({ response: {} }));
    this.initOcr();
  }

  handleFetchNoPeserta(): void {
    const action = this.profileRepository
      .getUserDetailData$()
      .pipe(
        take(1),
        tap((userDetail) => {
          const noPesertaPayload: GetNoPesertaDto = {
            idProfilDpa: <string>encryptContent(userDetail?.idProfilDpa),
            username: <string>userDetail?.email || <string>userDetail?.noHp,
          };
          this.store.dispatch(GetNoPeserta({ payload: noPesertaPayload }));
        })
      )
      .subscribe();

    this.subscribtions.add(action);
  }

  initOcr = () => {
    this.bindingValue();
    this.getAreaCode('provinsi');
    if (this.detailData?.idProvinsi) {
      this.getAreaCode('kabupaten', this.detailData?.idProvinsi);
    }
    if (this.detailData?.idKotaKabupaten) {
      this.getAreaCode('kecamatan', this.detailData?.idKotaKabupaten);
    }
    if (this.detailData?.idKecamatan) {
      this.getAreaCode('kelurahan', this.detailData?.idKecamatan);
    }
  };

  disableInputWhenVerified = () => {
    if (this.isVerified()) {
      this.formGroup.controls['nik'].disable();
      this.formGroup.controls['tanggalLahir'].disable();
      this.formGroup.controls['namaLengkap'].disable();
      this.formGroup.controls['tanggalLahir'].disable();
    }
  };

  bindingValue() {
    this.disableInputWhenVerified();
    this.tempBioData = this.detailData || null;
    this.fotoKtpExist = this.detailData?.fotoKtp;
    this.formGroup.get('nik')?.setValue(this.detailData?.nik || '');
    this.formGroup
      .get('namaLengkap')
      ?.setValue(this.detailData?.namaPeserta || '');
    this.formGroup
      .get('tanggalLahir')
      ?.setValue(
        dateFormat(this.detailData?.tanggalLahir || this.getMaxYear()) || ''
      );
    this.formGroup
      .get('tempatLahir')
      ?.setValue(this.detailData?.tempatLahir || '');
    this.formGroup
      .get('status')
      ?.setValue(this.detailData?.statusPerkawinan || '');
    this.formGroup
      .get('jenisKelamin')
      ?.setValue(this.detailData?.jenisKelamin || '');
    this.formGroup.get('alamat')?.setValue(this.detailData?.alamat || '');
    this.formGroup.get('rt')?.setValue(this.detailData?.rt || '');
    this.formGroup.get('rw')?.setValue(this.detailData?.rw || '');
    this.formGroup
      .get('kotaKabupaten')
      ?.setValue(this.detailData?.kotaKabupaten || '');
    this.formGroup.get('kecamatan')?.setValue(this.detailData?.kecamatan || '');
    this.formGroup.get('provinsi')?.setValue(this.detailData?.provinsi || '');
    this.formGroup
      .get('idKotaKabupaten')
      ?.setValue(this.detailData?.idKotaKabupaten || '');
    this.formGroup
      .get('idKecamatan')
      ?.setValue(this.detailData?.idKecamatan || '');
    this.formGroup
      .get('idProvinsi')
      ?.setValue(this.detailData?.idProvinsi || '');
    this.formGroup
      .get('idKelurahanDesa')
      ?.setValue(this.detailData?.idKelurahanDesa || '');
    this.formGroup
      .get('kelurahanDesa')
      ?.setValue(this.detailData?.kelurahanDesa || '');

    this.formGroup.controls['idProvinsi'].valueChanges.subscribe((value) => {
      this.formGroup
        .get('provinsi')
        ?.setValue(getValueFromObj(value, this.arrResProvinsi));
      this.formGroup.get('idKotaKabupaten')?.setValue('');
      this.formGroup.get('kotaKabupaten')?.setValue('');
      this.formGroup.get('idKecamatan')?.setValue('');
      this.formGroup.get('kecamatan')?.setValue('');
      this.formGroup.get('idKelurahanDesa')?.setValue('');
      this.formGroup.get('kelurahanDesa')?.setValue('');

      if (value) {
        this.getAreaCode('kabupaten', value);
      }
    });
    this.formGroup.controls['idKotaKabupaten'].valueChanges.subscribe(
      (value) => {
        this.formGroup
          .get('kotaKabupaten')
          ?.setValue(getValueFromObj(value, this.arrResKabupaten));
        this.formGroup.get('idKecamatan')?.setValue('');
        this.formGroup.get('kecamatan')?.setValue('');
        this.formGroup.get('idKelurahanDesa')?.setValue('');
        this.formGroup.get('kelurahanDesa')?.setValue('');
        if (value) {
          this.getAreaCode('kecamatan', value);
        }
      }
    );
    this.formGroup.controls['idKecamatan'].valueChanges.subscribe((value) => {
      this.formGroup
        .get('kecamatan')
        ?.setValue(getValueFromObj(value, this.arrResKecamatan));
      this.formGroup.get('idKelurahanDesa')?.setValue('');
      this.formGroup.get('kelurahanDesa')?.setValue('');
      this.getAreaCode('kelurahan', value);
    });

    this.formGroup.controls['idKelurahanDesa'].valueChanges.subscribe(
      (value) => {
        this.formGroup
          .get('kelurahanDesa')
          ?.setValue(getValueFromObj(value, this.arrResDesa));
      }
    );

    this.responseProvinsi$.subscribe((res: any) => {
      if (res) {
        this.arrResProvinsi = res || [];
        this.isLoadingLov.provinsi = false;
      }
    });
    this.responseKecamatan$.subscribe((res: any) => {
      if (res) {
        this.arrResKecamatan = res || [];
        this.isLoadingLov.kecamatan = false;
      }
    });

    this.responseKabupaten$.subscribe((res: any) => {
      if (res) {
        this.arrResKabupaten = res || [];
        this.isLoadingLov.kabupaten = false;
      }
    });

    this.responseDesa$.subscribe((res: any) => {
      if (res) {
        this.arrResDesa = res || [];
        this.isLoadingLov.kelurahan = false;
      }
    });
  }

  public handleClose = async () => {
    await this.modalCtrl?.dismiss();
  };

  public async handleBack() {
    await this.modalCtrl.dismiss({ back: true });
  }

  public async handleSelectMethod() {
    await this.modalCtrl.dismiss({ selected: true });
  }

  onInputChangeDate = (event: any, key: string) => {
    const newVal = dateFormat(event.target?.value);
    this.formGroup.get(key)?.setValue(newVal);
  };

  submit() {
    let payload: any = {
      ...this.detailData!,
      nik: this.formGroup.get('nik')?.value || '',
      namaPeserta: this.formGroup.get('namaLengkap')?.value || '',
      tanggalLahir:
        this.formGroup.get('tanggalLahir')?.value || this.getMaxYear(),
      tempatLahir: this.formGroup.get('tempatLahir')?.value || '',
      statusPerkawinan: this.formGroup.get('status')?.value || '',
      jenisKelamin: this.formGroup.get('jenisKelamin')?.value || '',
      alamat: this.formGroup.get('alamat')?.value || '',
      rt: this.formGroup.get('rt')?.value || '',
      rw: this.formGroup.get('rw')?.value || '',
      kotaKabupaten: this.formGroup.get('kotaKabupaten')?.value || '',
      kecamatan: this.formGroup.get('kecamatan')?.value || '',
      provinsi: this.formGroup.get('provinsi')?.value || '',
      idKotaKabupaten: this.formGroup.get('idKotaKabupaten')?.value || '',
      idKecamatan: this.formGroup.get('idKecamatan')?.value || '',
      idProvinsi: this.formGroup.get('idProvinsi')?.value || '',
      idKelurahanDesa: this.formGroup.get('idKelurahanDesa')?.value || '',
      kelurahanDesa: this.formGroup.get('kelurahanDesa')?.value || '',
    };

    delete payload.fotoKtp;
    if (this.fotoKtp) {
      payload.fotoKtp = this.fotoKtp;
    }

    const action = this.profileRepository
      .getUserDetailData$()
      .pipe(
        take(1),
        tap(async (user) => {
          if (user?.nik === payload.nik) {
            delete payload.nik;
          }

          if (payload.idProfilDpa) {
            delete payload.idProfilDpa;
          }

          payload = {
            ...payload,
            username: encryptContent(<string>user?.email || <string>user?.noHp),
          };

          this.store.dispatch(EditProfile({ payload }));
          this.isOpen = true

          this.ktpSubcribtions = await this.interactionResponse$.subscribe(
            async (res) => {
              if (res?.code == '01' || res?.code == '03') {
                this.fotoKtpExist = null;
                this.tempFileKtp = {};

                this.errorSavedData =
                  'Gagal menyimpan foto KTP / Data diri anda, Silahkan lengkapi kembali data diri anda / upload ulang foto KTP anda.';
                this.isLoading$ = of(false);
                setTimeout(() => {
                  this.errorSavedData = '';
                  this.cdr.markForCheck();
                }, 3000);
                this.errorSaveData = true;
                this.getRenderTextUploudKtp();
              } else {
                this.errorSaveData = false;
              }
            }
          );
        })
      )
      .subscribe();

    this.subscribtions.add(action);
  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

  resetState() {
    setTimeout(() => {
      this.store.dispatch(
        EditProfileInteractionReset({
          response: INITIAL_INTERACTION_STATE,
        })
      );
    }, 6000);
  }

  async handleOpenSuccessModal(flagNik: boolean) {
    if(this.isOpen){
      this.modalCtrl.dismiss({ success: true });
    }
    const modal = await this.modalCtrl.create({
      component: UpdateSucceedModal,
      cssClass: this.screenSizeService.isMobileResolution()
        ? 'modal-web ion-background-transparent'
        : 'modal-web ion-background-white',
      componentProps: {
        type: flagNik ? 'nik' : 'biodata',
      },
    });
    if(this.isOpen){
      await modal.present()
    }
    modal.onDidDismiss().then(({ data }) => {
      this.isOpen = false
      if (flagNik) {
        this.handleOpenUserNumber();
      }
    });
  }

  handleOpenUserNumber() {
    const action = this.authRepo
      .getNoPeserta$()
      .pipe(
        take(1),
        tap(async (noPeserta) => {
          if (noPeserta?.data?.length) {
            if (noPeserta?.data?.length === 1) {
              this.storageService.setStorage(
                StorageKeyEnum.NOMOR_PESERTA,
                noPeserta?.data[0]
              );
              this.router.navigate(['/home']);
              return;
            }

            const modal = await this.modalCtrl.create({
              component: AuthUserNumberModal,
              cssClass: this.screenSizeService.isMobileResolution()
                ? 'modal-web ion-background-transparent'
                : 'modal-web ion-background-white',
              componentProps: {
                noPesertaData: noPeserta?.data,
              },
            });
            await modal.present();
            modal.onDidDismiss().then(({ data }) => {
              if (data?.noPeserta) {
                this.storageService.setStorage(
                  StorageKeyEnum.NOMOR_PESERTA,
                  data?.noPeserta
                );
                this.router.navigate(['/home']);
                this.store.dispatch(
                  NeedVerification({
                    payload: {
                      logic: 'REGISTER_USER_BARU',
                      loginBy: encryptContent(
                        this.detailData?.email || this.detailData?.noHp
                      ),
                    },
                  })
                );
              }

              if (data?.added) {
                this.storageService.setStorage(
                  StorageKeyEnum.NOMOR_PESERTA,
                  data?.noPeserta
                );
                this.router.navigate(['/home']);
                this.store.dispatch(
                  NeedVerification({
                    payload: {
                      logic: 'REQUEST_NOMOR_PESERTA_BARU',
                      loginBy: encryptContent(
                        this.detailData?.email || this.detailData?.noHp
                      ),
                    },
                  })
                );
              }
            });
          }
        })
      )
      .subscribe();

    this.subscribtions.add(action);
  }

  handleErrorNikSubmit = async () => {
    const modal = await this.modalCtrl.create({
      component: UpdateFailedModal,
      cssClass: this.screenSizeService.isMobileResolution()
        ? 'modal-web ion-background-transparent'
        : 'modal-web ion-background-white',
      componentProps: {},
    });
    await modal.present();
    modal.onDidDismiss().then(({ data }) => {});
  };

  getRenderTextUploudKtp = (): string => {
    let res = 'Pilih Foto KTP';
    if (this.screenSizeService.isMobileResolution()) {
      res = 'Upload KTP';
    }
    if (this.infoUser?.statusVerify !== 'N') {
      res = 'Upload KTP berhasil';
    }
    if (this.errorSaveData) {
      return (res = 'Upload KTP');
    }
    return res;
  };

  getFileType = (type: string): string => {
    if (!type) return 'png';
    const srcArr = type?.split(/\//);
    return srcArr[srcArr?.length - 1] || 'png';
  };

  public getAttachmentKtp = async (key: string) => {
    if (this.isVerified()) {
      return;
    }
    this.generateBiodataFromOcr(true);
    const file = await this.cameraService.takePhoto(key);
    if (!file) return;
    const fileRes: any = await this.cameraService.resizeImage(file, 512);

    // const watermarkUrl: string = 'images/watermark-DPA.png';
    // await this.http
    //   .get(watermarkUrl, { responseType: 'blob' })
    //   .subscribe(async (watermarkBlob: Blob) => {
    //     const combinedWatermark: any = await this.cameraService.createWaterMark(
    //       fileRes,
    //       watermarkBlob
    //     );
    //     this.tempFileKtpWatermark = combinedWatermark;
    //     this.tempFileKtpWatermarkRender =
    //       URL.createObjectURL(combinedWatermark);
    //   });
    this.tempFileKtp = {
      src: URL.createObjectURL(fileRes),
      name: `ktp-file-${new Date().getTime()}.${this.getFileType(
        fileRes?.type
      )}`,
      type: fileRes?.type || 'image/jpeg',
    };
    this.fotoKtpExist = null;

    await this.store.dispatch(OcrKtpInteractionReset({}));
    this.generateOcrToken(fileRes);
  };

  tokenSubcribtions: any = null;
  generateOcrToken = async (file: any) => {
    if (this.tokenSubcribtions) {
      await this.tokenSubcribtions.unsubscribe();
      this.tokenSubcribtions = null;
    }

    if (this.ocrToken?.accessToken) {
      this.uploudingFotoKtp(file, this.ocrToken);
      return;
    }
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const payload: any = {
      // idProfilDpa,
    };
    await this.store.dispatch(OcrToken({ payload }));
    this.tokenSubcribtions = await this.responseOcrToken$.subscribe(
      async (tokenData: any) => {
        if (tokenData.accessToken) {
          this.uploudingFotoKtp(file, tokenData);
          if (this.tokenSubcribtions) {
            await this.tokenSubcribtions.unsubscribe();
          }
        }else{
          this.uploudingFotoKtp(file, tokenData);
        }
      }
    );
  };

  ktpSubcribtions: any = null;
  uploudingFotoKtp = async (file: any, tokenData: OCRTokenData) => {
    if (this.ktpSubcribtions) {
      await this.ktpSubcribtions.unsubscribe();
      this.ktpSubcribtions = null;
    }
    // const idProfilDpa = await this.storageService.getStorage(StorageKeyEnum.ID_PROFILE_DPA);
    const payload = {
      // idProfilDpa,
      ktp: file,
      ocrToken: `${tokenData?.accessToken}`,
      alreadyReq: 0,
      flagDummy: 0,
    };
    const checkExpiredOcr = this.storageService.getOcrLastRequest();
    if (!checkExpiredOcr.isExpired) {
      payload.alreadyReq = 1;
    } else {
      await this.storageService.setOcrLastRequest(new Date());
    }
    if (!environment.production) {
      payload.flagDummy = 1;
    }

    this.fotoKtp = this.tempFileKtpWatermark || file;
    await this.store.dispatch(OcrKtp({ payload }));

    this.ktpSubcribtions = await this.responseOcrKtp$.subscribe((res) => {
      if (res?.code == '00' || res?.code == '01') {
        if (res.data) {
          this.saveOcrToTempVariable(res.data);
        }
      }
    });
  };

  saveOcrToTempVariable = (data: OCRData) => {
    this.tempOcrData = data;
  };

  ucwords(str: string | any) {
    str = (str || '').toLowerCase();
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  }

  generateBiodataFromOcr = (isReset: boolean = false) => {
    this.isUseOcrData = !this.isUseOcrData;
    if (isReset) {
      this.isUseOcrData = false;
    }
    if (this.isUseOcrData) {
      this.tempBioData = {
        ...this.detailData!,
        nik: this.formGroup.get('nik')?.value || '',
        namaPeserta: this.formGroup.get('namaLengkap')?.value || '',
        tanggalLahir:
          this.formGroup.get('tanggalLahir')?.value || this.getMaxYear(),
        tempatLahir: this.formGroup.get('tempatLahir')?.value || '',
        statusPerkawinan: this.formGroup.get('status')?.value || '',
        jenisKelamin: this.formGroup.get('jenisKelamin')?.value || '',
        alamat: this.formGroup.get('alamat')?.value || '',
        rt: this.formGroup.get('rt')?.value || '',
        rw: this.formGroup.get('rw')?.value || '',
        kotaKabupaten: this.formGroup.get('kotaKabupaten')?.value || '',
        kecamatan: this.formGroup.get('kecamatan')?.value || '',
        provinsi: this.formGroup.get('provinsi')?.value || '',

        idKotaKabupaten: this.formGroup.get('idKotaKabupaten')?.value || '',
        idKecamatan: this.formGroup.get('idKecamatan')?.value || '',
        idProvinsi: this.formGroup.get('idProvinsi')?.value || '',
        idKelurahanDesa: this.formGroup.get('idKelurahanDesa')?.value || '',
        kelurahanDesa: this.formGroup.get('kelurahanDesa')?.value || '',
      };

      this.formGroup.get('nik')?.setValue(this.tempOcrData?.nik?.value || '');
      this.formGroup
        .get('namaLengkap')
        ?.setValue(this.ucwords(this.tempOcrData?.nama?.value || ''));
      this.formGroup
        .get('tanggalLahir')
        ?.setValue(dateFormat(this.tempOcrData?.tanggallahir?.value) || '');
      this.formGroup
        .get('tempatLahir')
        ?.setValue(this.ucwords(this.tempOcrData?.tempatlahir?.value || ''));
      this.formGroup
        .get('status')
        ?.setValue(
          this.ucwords(this.tempOcrData?.statusperkawinan?.value || '')
        );
      this.formGroup
        .get('jenisKelamin')
        ?.setValue(this.ucwords(this.tempOcrData?.jeniskelamin?.value || ''));
      this.formGroup
        .get('alamat')
        ?.setValue(this.ucwords(this.tempOcrData?.alamat?.value || ''));
      this.formGroup
        .get('rt')
        ?.setValue(this.getRtRw(this.tempOcrData?.rtrw?.value)?.rt || '');
      this.formGroup
        .get('rw')
        ?.setValue(this.getRtRw(this.tempOcrData?.rtrw?.value)?.rw || '');
      this.generateLovFromOcr(this.tempOcrData);
    } else {
      this.formGroup.get('nik')?.setValue(this.tempBioData?.nik);
      this.formGroup
        .get('namaLengkap')
        ?.setValue(this.tempBioData?.namaPeserta);
      this.formGroup
        .get('tanggalLahir')
        ?.setValue(dateFormat(this.tempBioData?.tanggalLahir || new Date()));
      this.formGroup
        .get('tempatLahir')
        ?.setValue(this.tempBioData?.tempatLahir || '');
      this.formGroup
        .get('status')
        ?.setValue(this.tempBioData?.statusPerkawinan || '');
      this.formGroup
        .get('jenisKelamin')
        ?.setValue(this.tempBioData?.jenisKelamin || '');
      this.formGroup.get('alamat')?.setValue(this.tempBioData?.alamat || '');
      this.formGroup.get('rt')?.setValue(this.tempBioData?.rw || '');
      this.formGroup.get('rw')?.setValue(this.tempBioData?.rw || '');
    }
  };

  getRtRw = (str: string | any = '') => {
    const arr = str?.split?.(/\//);
    if (arr) {
      return {
        rt: arr[0],
        rw: arr[1],
      };
    }
    return {
      rt: str,
      rw: str,
    };
  };

  onSearchLov = (value: any, arr: AreaMappingData[]) => {
    value = (value || '')?.toString()?.toLowerCase();
    value = (value || '').replace(/kabupaten/gi, 'kab.');
    const result: AreaMappingData[] = [];
    const optionsLength = arr.length;
    for (let i = 0; i < optionsLength; i++) {
      const item = arr[i];
      const testValue = (item.namaAlamat || '').toString?.()?.toLowerCase?.();
      if (testValue.match(value)) {
        result.push(item);
      }
    }
    return result;
  };

  private subsProvinsi: any = null;
  private subsKabupaten: any = null;
  private subsKecamatan: any = null;
  private subsKelurahan: any = null;
  generateLovFromOcr = async (data: OCRData | any) => {
    if (this.subsProvinsi) {
      await this.subsProvinsi.unsubscribe();
      this.subsProvinsi = null;
    }
    this.getAreaCode('provinsi');
    this.subsProvinsi = await this.responseProvinsi$.subscribe((e: any) => {
      if (e) {
        const getCode = this.onSearchLov(data?.provinsi?.value, e);
        this.formGroup
          .get('provinsi')
          ?.setValue(getCode?.[0]?.namaAlamat || '');
        this.formGroup
          .get('idProvinsi')
          ?.setValue(getCode?.[0]?.kodeAlamat || '');
      }
    });

    if (this.subsKabupaten) {
      await this.subsKabupaten.unsubscribe();
      this.subsKabupaten = null;
    }
    this.subsKabupaten = await this.responseKabupaten$.subscribe((e: any) => {
      if (e) {
        const getCode = this.onSearchLov(data?.kotakabupaten?.value, e);
        this.formGroup
          .get('kotaKabupaten')
          ?.setValue(getCode?.[0]?.namaAlamat || '');
        this.formGroup
          .get('idKotaKabupaten')
          ?.setValue(getCode?.[0]?.kodeAlamat || '');
      }
    });

    if (this.subsKecamatan) {
      await this.subsKecamatan.unsubscribe();
      this.subsKecamatan = null;
    }
    this.subsKecamatan = await this.responseKecamatan$.subscribe((e: any) => {
      if (e) {
        const getCode = this.onSearchLov(data?.kecamatan?.value, e);
        this.formGroup
          .get('kecamatan')
          ?.setValue(getCode?.[0]?.namaAlamat || '');
        this.formGroup
          .get('idKecamatan')
          ?.setValue(getCode?.[0]?.kodeAlamat || '');
      }
    });

    if (this.subsKelurahan) {
      await this.subsKelurahan.unsubscribe();
      this.subsKelurahan = null;
    }
    this.subsKelurahan = await this.responseDesa$.subscribe((e: any) => {
      if (e) {
        const getCode = this.onSearchLov(data?.kelurahandesa?.value, e);
        this.formGroup
          .get('kelurahanDesa')
          ?.setValue(getCode?.[0]?.namaAlamat || '');
        this.formGroup
          .get('idKelurahanDesa')
          ?.setValue(getCode?.[0]?.kodeAlamat || '');
      }
    });
  };

  getDateBirthValue = () => {
    const value = this.formGroup.get('tanggalLahir')?.value;
    if (value) {
      return dateFormat(value);
    }
    return this.getMaxYear();
  };

  getAreaCode = (key = 'provinsi', id?: any) => {
    if (key !== 'provinsi' && !id) return;
    this.isLoadingLov[key] = true;
    const ENUM_PAYLOAD: any = {
      provinsi: {
        type: key?.toUpperCase(),
        key,
      },
      kabupaten: {
        type: key?.toUpperCase(),
        key,
        idProvinsi: id,
      },
      kecamatan: {
        type: key?.toUpperCase(),
        key,
        idKabupaten: id,
      },
      kelurahan: {
        type: key?.toUpperCase(),
        key,
        idKecamatan: id,
      },
    };
    const payload: AreaMappingDto = ENUM_PAYLOAD[key];
    this.store.dispatch(AreaMapping({ payload }));
  };

  async downloadDoc() {
    await this.cekPermissions();
    if (Capacitor.getPlatform() === 'web') {
      await Browser.open({
        url: 'images/form-data-diri.pdf',
        presentationStyle: 'popover',
      });
    } else {
      const formDataDiriUrl = 'images/form-data-diri.pdf';
      await this.http
        .get(formDataDiriUrl, { responseType: 'blob' })
        .subscribe(async (blob: Blob) => {
          // Save the PDF to the data Directory of our App
          const name = `form-data-diri-${new Date().getTime()}.pdf`;
          const checkPermission = await Filesystem.checkPermissions();
          if (checkPermission.publicStorage !== 'granted') {
            await Filesystem.requestPermissions();
          }
          const base64data = await blob.text();
          await Filesystem.writeFile({
            path: name,
            data: base64data,
            directory: Directory.Documents,
          });

          const toast = await this.toastController.create({
            message: 'Download selesai, Silahkan bukan folder Document',
            duration: 1500,
            position: 'bottom',
            mode: 'ios',
          });
          await toast.present();
        });
    }
  }

  cekPermissions() {
    if (this.device.platform == 'Android') {
      this.androidPermissions
        .checkPermission(
          this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
        )
        .then(
          (result) => null,
          (err) =>
            this.androidPermissions.requestPermission(
              this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
            )
        );

      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.GET_ACCOUNTS,
      ]);

      this.file
        .checkDir(this.file.externalDataDirectory, 'Download')
        .then((res) => {})
        .catch((error) => {
          this.file.createDir(
            this.file.externalDataDirectory,
            'Download',
            true
          );
        });
    }
  }

  generateOptionArea = (arr: any): IOption[] | undefined => {
    if (!arr) return arr;
    const temp: IOption[] = [];
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        const item: AreaMappingData = arr[i];
        temp.push({
          id: item.kodeAlamat || '',
          label: item.namaAlamat || '',
        });
      }
    }
    return temp;
  };

  onInputChange = (event: any, key: string) => {
    const newVal = event.target?.value?.replace?.(/[^0-9]*/g, '');
    this.formGroup.get(key)?.setValue(newVal);
  };

  isVerified = () => {
    if (this.infoUser?.statusVerify?.toLowerCase() == 'y') {
      return true;
    }
    return false;
  };

  handleOpenUploadFotoModal = async () => {
    if (this.isVerified()) {
      return;
    }
    if (this.screenSizeService.isDesktopNativeResolution()) {
      this.getAttachmentKtp('photo');
      return;
    }
    const modal = await this.modalCtrl.create({
      component: ProfileUploadFotoModal,
      cssClass: 'modal-web ion-background-transparent',
      componentProps: {
        getAttachment: this.getAttachmentKtp,
      },
    });
    modal.present();
    modal.onDidDismiss().then((data: any) => {});

  };

  onRtRwChanges = (e: any, key: string) => {
    if (e?.target?.value) {
      const val = (e.target.value || '').replace(/[^0-9]+/g, '');
      this.formGroup.controls[key].setValue(val);
    }
  };

  getMaxYear = () => {
    return dayjs(new Date()).subtract(18, 'year').format('YYYY-MM-DD');
  };
}
