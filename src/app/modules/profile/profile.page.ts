import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import {
  BaseProfile,
  DetailProfile,
  ToggleBiometric,
  UserDetail,
  UserInfo,
} from '@controllers/profile';
import { IonContent, isPlatform } from '@ionic/angular';

import { Store } from '@ngrx/store';
import {
  INITIAL_INTERACTION_STATE,
  InteractionState,
  InteractionType,
  encryptContent,
} from '@shared';
import { AuthInteractionRepository } from '@stores/auth';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { AvailableResult, NativeBiometric } from 'capacitor-native-biometric';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { ProfileState } from 'libs/stores/profile/states/profile.state';
import {
  filter,
  from,
  map,
  Observable,
  Subscriber,
  Subscription,
  tap,
} from 'rxjs';
import { AppComponentService } from 'src/app/app.component.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { environment } from 'src/environments/environment';

interface getPageTitle {
  label: string;
  rightBtn?: () => void;
  rightBtnText?: string;
  isHide?: boolean;
}
@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  providers: [
    ProfileRepository,
    ProfileInteractionRepository,
    AuthInteractionRepository,
  ],
})
export class ProfilePage implements OnInit, OnDestroy {
  @ViewChild(IonContent, { static: false }) content: IonContent | any = {};
  public response$: Observable<BaseProfile | undefined | null>;
  public detailProfile$: Observable<DetailProfile | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;
  public interactionResponseDetailProfile$: Observable<
    InteractionState | undefined | null
  >;

  public eventListernerRouter: any = null;

  public subs = new Subscription();
  public isUseBiometric: boolean = false;

  public biometricResult$: Observable<AvailableResult> = from(
    NativeBiometric.isAvailable()
  );

  constructor(
    private store: Store<ProfileState>,
    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    private storageService: StorageService,
    private router: Router,
    public screenSizeService: ScreenSizeService,
    private authInteractRepo: AuthInteractionRepository,
    public templateService: AppMainTemplateService,
    public appComponentService: AppComponentService,
    private cdr: ChangeDetectorRef
  ) {
    this.response$ = this.profileRepository.getUserInfoData$();
    this.detailProfile$ = this.profileRepository.getUserDetailData$();
    this.interactionResponseDetailProfile$ =
      this.profileInteractionRepository.getUserDetailInteraction$();

    this.interactionResponse$ =
      this.profileInteractionRepository.getUserInfoInteraction$();
    // this.handleChangeTemplateService();
    this.eventListernerRouter = this.router.events.subscribe((e) => {
      if (this.router.url == '/profile') {
        this.handleChangeTemplateService();
      }
    });
  }

  handleChangeTemplateService() {
    this.templateService.handleInit();
    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-neutral-0');
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none text-800'
        : 'bg-lazuli-400 h-[78px] text-neutral-0'
    );
    this.templateService.handleChangePageTitle('Profil');
    this.templateService.handleUseSecondaryHeader(true);
    this.templateService.handleShowIconFloating(true);
  }

  public get isWebBase(): boolean {
    return Capacitor.getPlatform() === 'web';
  }

  async ngOnInit() {
    // setTimeout(() => {}, 0);

    this.handleSetValue();

    this.fetchUserDetail();
    this.fetchUserInfo();
    this.isDesktop();
    this.router.events.subscribe((e) => {
      if (this.content) this.content.scrollToTop(0);
    });

    this.handleToggleInteraction();

    this.handleInteractionOCR();
  }

  async handleSetValue() {
    const isUseBiometric = await this.storageService.getStorage(
      StorageKeyEnum.BIOMETRIC
    );
    this.isUseBiometric = isUseBiometric ? true : false;
    this.cdr.markForCheck();
  }

  handleToggleInteraction(): void {
    this.profileInteractionRepository
      .toggleBiometricInteraction$()
      .pipe(
        filter((res) => !!res),
        tap((res) => {
          if (res?.type === InteractionType.SUCCEED) {
            this.fetchUserDetail();
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.templateService.handleInit();
    this.cdr.markForCheck();
    this.subs.unsubscribe();
    this.eventListernerRouter.unsubscribe();
  }

  public handleInteractionOCR(): void {
    const response = this.profileInteractionRepository
      .ocrUploadKtpInteraction$()
      .pipe(
        tap((interaction) => {
          if (interaction.isLoading) {
            this.appComponentService.handleShowOcrKtp(true);
          } else {
            this.appComponentService.handleShowOcrKtp(false);
          }
        })
      )
      .subscribe();

    this.subs.add(response);
  }

  async fetchUserDetail() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = {};
    this.store.dispatch(UserDetail({ payload }));
  }

  async fetchUserInfo() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = {};
    this.store.dispatch(UserInfo({ payload }));
  }

  async logout() {
    const isUseBiometric = await this.storageService.getStorage(
      StorageKeyEnum.BIOMETRIC
    );
    this.storageService.clearStorage();
    window.location.replace('/home');
    // this.router.navigateByUrl('/');
  }

  isDesktop(): boolean {
    const url = this.router?.routerState?.snapshot?.url || '';
    const arrUrl = url.split('/').filter((item) => item);
    if (this.screenSizeService.isMobileResolution()) {
      if (arrUrl[arrUrl.length - 1] == 'profile') {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  getPageTitel(): getPageTitle {
    const url = this.router?.routerState?.snapshot?.url || '';
    const arrUrl: Array<string> = url.split('/').filter((item) => item);
    const targetKeyUrl: string = arrUrl[arrUrl.length - 1];
    interface ListOfPage<T> {
      [key: string]: T;
    }
    const listPageTitle: ListOfPage<getPageTitle> = {
      bio: { label: 'Biodata Diri' },
      rate: { label: 'Nilai Kami' },
      card: { label: 'Kartu Peserta DPA' },
      help: { label: 'Pusat Bantuan DPA' },
      notification: {
        label: 'Notifikasi',
        rightBtn: () => null,
        rightBtnText: 'Tandai semua dibaca',
        isHide: !this.screenSizeService.isDesktopResolution(),
      },
      settings: { label: 'Pengaturan' },
      privacy: { label: 'Kebijakan Privasi' },
    };
    return listPageTitle[targetKeyUrl] || { label: '' };
  }

  onSetTogleBiometric = async (e: any) => {
    const isUseBiometric = await this.storageService.getStorage(
      StorageKeyEnum.BIOMETRIC
    );
    const detailProfile = await this.storageService.getStorage(
      StorageKeyEnum.DETAIL_PROFILE
    );
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    const usernameEncrypt = encryptContent(
      detailProfile?.email || detailProfile?.noHp
    );

    const idProfilDpaEncrypt = idProfilDpa;

    if (isUseBiometric) {
      await NativeBiometric.deleteCredentials({
        server: 'com.dpareborn.id',
      }).then();
      await this.storageService.removeStorage(StorageKeyEnum.BIOMETRIC);
    } else {
      await NativeBiometric.setCredentials({
        username: <string>usernameEncrypt,
        password: <string>encryptContent(environment.key),
        server: 'com.dpareborn.id',
      }).then();
      await this.storageService.setStorage(StorageKeyEnum.BIOMETRIC, {
        idProfilDpa: idProfilDpaEncrypt,
        username: usernameEncrypt,
      });
    }

    await this.handleSetValue();
  };

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
}
