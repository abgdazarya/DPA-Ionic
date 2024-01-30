import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { AuthOtpModal } from '@components/auth';
import {
  ProfileContactEmailModal,
  ProfileContactPhoneModal,
  ProfileOcrModal,
  ProfileRelativeContactModal,
} from '@components/profile';
import {
  BaseProfile,
  DetailProfile,
  GetLink,
  LinkData,
  UploadPhoto,
  UploadPhotoData,
  UploadPhotoInteractionReset,
  UserDetail,
  UserInfo,
} from '@controllers/profile';
import { LoadingController, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  DataResponse,
  INITIAL_INTERACTION_STATE,
  InteractionState,
  InteractionType,
  decryptContent,
} from '@shared';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { DeleteAccountModal } from 'libs/components/profile/modals/detele-account/detele-account.modal';
import { ProfileUploadFotoModal } from 'libs/components/profile/modals/upload-foto/upload-foto.modal';
import { ProfileService } from 'libs/controllers/profile/services/profile.service';
import { CameraService } from 'libs/services/common/camera.service';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { ProfileState } from 'libs/stores/profile/states/profile.state';
import { filter, map, Observable, take, tap } from 'rxjs';
import { AppComponentService } from 'src/app/app.component.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-profile-bio',
  templateUrl: 'profile-bio.page.html',
  styleUrls: ['profile-bio.page.scss'],
})
export class ProfileBioPage implements OnInit, OnDestroy {
  public response$: Observable<DetailProfile | undefined | null>;
  public responseUserInfo$: Observable<BaseProfile | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;
  public photoResponse$: Observable<
    DataResponse<UploadPhotoData> | undefined | null
  >;
  public imageSrc: string = '';
  public userDetail: DetailProfile | any = {};
  public userInfo: BaseProfile | any = {};
  datahubunganKerabat: any = [];
  datahubunganKerabatMapped: any = {};
  isMobile: boolean = false;

  public uploadPhotoProfileSuccess$: Observable<string | undefined | null>;
  public uploadPhotoProfileFailed$: Observable<string | undefined | null>;
  public linkResponse$: Observable<DataResponse<LinkData> | undefined | null>;

  public constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private route: ActivatedRoute,

    private store: Store<ProfileState>,
    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    private cameraService: CameraService,
    private storageService: StorageService,
    public screenSizeService: ScreenSizeService,
    private loadingCtrl: LoadingController,
    private profileService: ProfileService,
    public templateService: AppMainTemplateService,
    private cdr: ChangeDetectorRef,
    private appService: AppComponentService
  ) {
    this.uploadPhotoProfileSuccess$ = this.profileInteractionRepository
      .uploadPhotoInteraction$()
      .pipe(map((res) => res.success));
    this.uploadPhotoProfileFailed$ = this.profileInteractionRepository
      .uploadPhotoInteraction$()
      .pipe(map((res) => res.error));

    this.response$ = this.profileRepository.getUserDetailData$();
    this.responseUserInfo$ = this.profileRepository.getUserInfoData$();
    this.interactionResponse$ =
      this.profileInteractionRepository.getUserDetailInteraction$();
    this.photoResponse$ = this.profileRepository.uploadPhoto$();
    this.linkResponse$ = this.profileRepository.getLink$();
    this.response$.subscribe((user) => {
      if (user) {
        this.userDetail = user;
        this.loadingCtrl
          .getTop()
          .then((v) => (v ? this.loadingCtrl.dismiss() : null));
      }
    });
    this.photoResponse$.subscribe((res) => {
      if (res?.code === '01') {
        this.fetchUserDetail();
      }
    });
    this.responseUserInfo$.subscribe((user) => {
      if (user) {
        this.userInfo = user;
      }
    });

    profileService.getHubunganKerabat().subscribe((res: any) => {
      if (res.code == '00') {
        this.datahubunganKerabat = res['data'];
        this.datahubunganKerabat.push({
          ID_HUBUNGAN_KERABAT: '0000',
          HUBUNGAN_KERABAT: 'Lainnya',
        });
        for (var i = 0; i < this.datahubunganKerabat.length; i++) {
          this.datahubunganKerabatMapped[
            this.datahubunganKerabat[i].ID_HUBUNGAN_KERABAT
          ] = this.datahubunganKerabat[i];
        }
      }
    });
  }

  getPhoto = () => {
    return this.imageSrc || this.userDetail.photo || '';
  };

  ngOnInit(): void {
    this.screenSizeService.isMobileResolution()
      ? (this.isMobile = true)
      : (this.isMobile = false);

    setTimeout(() => {
      this.onInitTheme();
      this.cdr.markForCheck();
    }, 0);

    this.fetchUserDetail();
    this.handlePageChange();
    this.handleResponseUserDetail();
    this.handleResponseUploadPhoto();
    setTimeout(() => this.fetchWhatsappLink());

    const { bioPopupShow } = this.route.snapshot.queryParams;
    if (bioPopupShow) {
      this.handleOpenOcrModal();
    }
  }

  ngOnDestroy(): void {}

  public handleResponseUploadPhoto(): void {
    this.profileInteractionRepository
      .uploadPhotoInteraction$()
      .pipe(
        filter((res) => !!res),
        tap((res) => {
          this.appService.handleShowLoadingPending(
            <boolean>res.isLoading,
            'response upload foto trigger'
          );
          if (
            res.type === InteractionType.SUCCEED ||
            res.type === InteractionType.FAILED
          ) {
            setTimeout(() => {
              this.store.dispatch(
                UploadPhotoInteractionReset({
                  response: INITIAL_INTERACTION_STATE,
                })
              );
            }, 6000);
          }
        })
      )
      .subscribe();
  }

  public handleResponseUserDetail(): void {
    this.profileRepository
      .getUserDetailData$()
      .pipe(
        filter((res) => !!res),
        take(1),
        tap((data) => {
          if (data?.statusVerify === 'N') {
            setTimeout(() => {
              this.handleOpenOcrModal();
            }, 0);
          }
        })
      )
      .subscribe();
  }

  onInitTheme = () => {
    this.templateService.handleInit();

    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none text-800'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('Biodata Diri');
    this.templateService.handleUseSecondaryHeader(true);
  };

  fetchUserDetail = async () => {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = {};
    await this.store.dispatch(UserDetail({ payload }));
  };

  async handleOpenOcrModal() {
    let detailData: Partial<DetailProfile> | undefined | null = undefined;
    let infoUser: Partial<BaseProfile> | any = {};
    this.response$.subscribe((res) => {
      detailData = res;
    });
    this.responseUserInfo$.subscribe((res) => {
      infoUser = res;
    });
    const modal = await this.modalCtrl.create({
      component: ProfileOcrModal,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        detailData,
        infoUser,
      },
    });
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    modal.present();
    modal.onDidDismiss().then((data: any) => {
      if (!!data?.data?.success) {
        if (!idProfilDpa) return;
        const payload = {};
        this.store.dispatch(UserInfo({ payload }));
        this.store.dispatch(UserDetail({ payload }));
      }
    });
  }

  handleOpenUploadFotoModal = async () => {
    if (this.screenSizeService.isDesktopNativeResolution()) {
      this.getAttachmentFoto('photo');
      return;
    }
    const modal = await this.modalCtrl.create({
      component: ProfileUploadFotoModal,
      cssClass: 'modal-web ion-background-transparent',
      componentProps: {
        getAttachment: this.getAttachmentFoto,
      },
    });
    modal.present();
    modal.onDidDismiss().then((data: any) => {});
  };

  async handleOpenRelativeContactModal() {
    let kerabatData: Partial<DetailProfile> | undefined | null = undefined;
    this.response$.subscribe((res) => {
      kerabatData = res;
    });
    const modal = await this.modalCtrl.create({
      component: ProfileRelativeContactModal,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        kerabatData,
        datahubunganKerabat: this.datahubunganKerabat,
      },
    });
    modal.present();
    modal.onDidDismiss().then((data) => {});
  }

  async handleOpenContactEmailModal() {
    let detailUser: Partial<DetailProfile> | any = {};
    this.response$.subscribe((res) => {
      detailUser = res;
    });
    const modal = await this.modalCtrl.create({
      component: ProfileContactEmailModal,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        detailUser,
      },
    });
    modal.present();
    modal.onDidDismiss().then(({ data }) => {
      if (!!data) {
        this.fetchUserDetail();
      }
    });
  }

  async handleOpenContactPhoneModal() {
    let detailUser: Partial<DetailProfile> | any = {};
    this.response$.subscribe((res) => {
      detailUser = res;
    });
    // if (infoUser?.noHp) {
    //   return;
    // }
    const modal = await this.modalCtrl.create({
      component: ProfileContactPhoneModal,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        detailUser,
      },
    });
    await modal.present();
    await modal.onDidDismiss().then(({ data }) => {
      // if (data?.submitted) {
      //   this.handleOpenOtpModal();
      // }
      if (!!data?.success) {
        this.fetchUserDetail();
      }
    });
  }

  async handleOpenOtpModal() {
    const modal = await this.modalCtrl.create({
      component: AuthOtpModal,
      backdropDismiss: false,
      cssClass: 'modal-web ion-background-white',
    });
    modal.present();
    await modal.onDidDismiss().then(({ data }) => {
      if (!!data?.success) {
        this.fetchUserDetail();
      }
    });
  }

  // const file = await this.cameraService.takePhoto(key);
  // if (!file) return;
  // const fileRes: any = await this.cameraService.resizeImage(file, 512);

  // const watermarkUrl = 'images/watermark-DPA.png';
  // await this.http
  //   .get(watermarkUrl, { responseType: 'blob' })
  //   .subscribe(async (watermarkBlob: Blob) => {
  //     var objectURL = URL.createObjectURL(watermarkBlob);
  //     var fr = (await document.getElementById('frame')) as HTMLImageElement;
  //     fr.src = objectURL;
  //   });

  // this.tempFileKtp = {
  //   src: URL.createObjectURL(fileRes),
  //   name: 'photo-profile',
  //   type: 'image/jpeg',
  // };

  errorFile: any = '';
  public getAttachmentFoto = async (key: string) => {
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
    const file: any = await this.cameraService.takePhoto(key);

    if (!file) return;

    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (Capacitor.getPlatform() == 'web') {
      const fileRes: any = await this.cameraService.resizeImage(file, 512);

      this.imageSrc = URL.createObjectURL(fileRes);
      const payload = {
        photo: file,
      };
      this.store.dispatch(UploadPhoto({ payload }));
      this.cdr.markForCheck();
    } else {
      this.imageSrc = URL.createObjectURL(file);
      const payload = {
        photo: file,
      };
      this.store.dispatch(UploadPhoto({ payload }));
      this.cdr.markForCheck();
    }
    // this.showLoadingImage();
  };

  public isVerified = (type?: string): boolean => {
    let userDetail: DetailProfile | any = this.userDetail;
    let userInfo: BaseProfile | any = this.userInfo;
    if (type == 'phone') {
      return userDetail?.noHp ? true : false;
    } else if (type == 'email') {
      return userDetail?.email ? true : false;
    }
    if (userInfo?.statusVerify === 'Y') {
      return true;
    }
    return false;
  };

  getHubunganName(hId: any): void {
    return this.datahubunganKerabatMapped[hId]
      ? this.datahubunganKerabatMapped[hId].HUBUNGAN_KERABAT
      : hId;
  }

  // async showLoadingImage() {
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Uploading Image',
  //   });
  //   loading.present();
  //   await loading.onDidDismiss().then(({ data }) => {
  //     if (!!data?.success) {
  //       this.fetchUserDetail();
  //     }
  //   });
  // }

  public handlePageChange(): void {
    const el: any = document.querySelector('.page-container-main');
    if (el) {
      el.scrollToTop?.();
    }
  }

  renderName = (str: string | any) => {
    if (this.screenSizeService.isDesktopNativeResolution()) return [str];
    if (str) {
      const arr = str.split?.(' ') || [];
      const temparr = [];
      let tempName = [];
      for (let i = 0, length = arr.length; i < length; i++) {
        tempName.push(arr[i]);
        if ((i + 1) % 3 == 0 || i >= 3 || i >= length - 1) {
          tempName.push(' ');
          temparr.push(tempName.join(' '));
          tempName = [];
        }
        if (i >= 3) break;
      }

      return temparr;
    } else {
      return str;
    }
  };

  generateThemplateMessage = (noPeserta: string | any) => {
    return `
Hai Insan Astra terima kasih telah menghubungi kami.
Agar memudahkan kami untuk melayani Anda, silahkan lengkapi data berikut :

Nama : ${this.userDetail.namaPeserta}
Tgl Lahir : ${this.userDetail.tanggalLahir}
Asal Perusahaan : 
NPK : 
Nomor Peserta DPA : ${noPeserta || ''}
Email : ${this.userDetail.email}
HP : ${this.userDetail.noHp}

Silahkan sampaikan apa yang bisa kami bantu : Hapus akun myDPA
Alasan hapus akun myDPA:

Terima Kasih
    `;
  };

  onOpenDeleteAkun = async () => {
    let appLink: string = '';

    // const message: string = this.generateThemplateMessage(noPeserta ? decryptContent(noPeserta) : null)
    const message: string = '';

    const modal = await this.modalCtrl.create({
      component: DeleteAccountModal,
      cssClass: this.screenSizeService.isDesktopNativeResolution()
        ? 'modal-web ion-background-white'
        : 'modal-web ion-background-transparent',
      componentProps: {
        appLink,
      },
    });
    await modal.present();
    await modal.onDidDismiss().then(({ data }) => {
      if (data?.submitted) {
        this.storageService.clearStorage();
        window.location.replace('/home');
      }
    });
  };

  fetchWhatsappLink() {
    const payload = { condition: 'LINK_WHATSAPP' };
    this.store.dispatch(GetLink({ payload }));
  }
}
