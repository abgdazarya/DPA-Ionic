import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FCM } from '@capacitor-community/fcm';
import { Capacitor } from '@capacitor/core';
import {
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import {
  AuthService,
  ResetAllState as ResetAllStateAuth,
  SaveUserSession,
} from '@controllers/auth';
import { ResetAllState as ResetAllStateHome } from '@controllers/home';
import {
  GetHubDpa,
  ResetAllState as ResetAllStateMenu,
} from '@controllers/menu';
import { ResetAllState as ResetAllStateMagazine } from '@controllers/menu-astramagazine';
import { ResetAllState as ResetAllStateDpaTv } from '@controllers/menu-dpa-tv';
import { ResetAllState as ResetAllStateJob } from '@controllers/menu-job';
import { ResetAllState as ResetAllStateLaporanInvestasi } from '@controllers/menu-laporan-investasi';
import { ResetAllState as ResetAllStateNews } from '@controllers/menu-news';
import { ResetAllState as ResetAllStatePromotion } from '@controllers/menu-promotion';
import {
  BaseProfile,
  GetLink,
  ResetAllState as ResetAllStateProfile,
  SetTokenFcm,
  ToggleNotification,
  UserDetail,
  UserInfo,
} from '@controllers/profile';
import { ResetAllState as ResetAllStateQuiz } from '@controllers/quiz';

import { Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import {
  Observable,
  catchError,
  filter,
  from,
  map,
  mergeMap,
  of,
  take,
} from 'rxjs';

@Injectable()
export class HomePageService {
  public profileRes$: Observable<BaseProfile | undefined | null>;
  public profileResInteraction$: Observable<
    InteractionState | undefined | null
  >;

  constructor(
    private store: Store,
    private storageService: StorageService,
    private authService: AuthService,
    public profileRepo: ProfileRepository,
    public profileInteractionRepo: ProfileInteractionRepository,
    private router: Router
  ) {
    this.profileRes$ = this.profileRepo.getUserInfoData$();
    this.profileResInteraction$ =
      this.profileInteractionRepo.getUserInfoInteraction$();
  }

  public handleResetAllState(): void {
    this.store.dispatch(ResetAllStateAuth());
    this.store.dispatch(ResetAllStateMagazine());
    this.store.dispatch(ResetAllStateDpaTv());
    this.store.dispatch(ResetAllStateHome());
    this.store.dispatch(ResetAllStateJob());
    this.store.dispatch(ResetAllStateLaporanInvestasi());
    this.store.dispatch(ResetAllStateMenu());
    this.store.dispatch(ResetAllStateNews());
    this.store.dispatch(ResetAllStateProfile());
    this.store.dispatch(ResetAllStatePromotion());
    this.store.dispatch(ResetAllStateQuiz());
  }

  public handleFetchWhatsappLink() {
    const payload = { condition: 'LINK_WHATSAPP' };
    this.store.dispatch(GetLink({ payload }));
  }

  public handleFetchHubDpa() {
    this.store.dispatch(GetHubDpa({ payload: {} }));
  }

  public handleFetchProfile() {
    const idProfilDpa = this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    if (idProfilDpa) {
      this.store.dispatch(UserInfo({ payload: {} }));
    }
  }

  public handleFetchUserDetail() {
    const idProfilDpa = this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    if (idProfilDpa) {
      this.store.dispatch(UserDetail({ payload: {} }));
    }
  }

  public async handleSetFCMToken() {
    const tokenStored = this.storageService.getStorage(
      StorageKeyEnum.TOKEN_STORED
    );

    const noPeserta = this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );

    if (!tokenStored) {
      if (Capacitor.getPlatform() !== 'web') {
        let permStatus = await PushNotifications.checkPermissions();

        if (permStatus.receive === 'prompt') {
          permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive !== 'granted') {
          this.store.dispatch(
            ToggleNotification({ payload: { notificationToggle: '0' } })
          );

          throw new Error('User denied permissions!');
        }

        await PushNotifications.register();

        if (Capacitor.getPlatform() === 'ios') {
          FCM.getToken()
            .then(async (fcm) => {
              const idProfilDpa = await this.storageService.getStorage(
                StorageKeyEnum.ID_PROFILE_DPA
              );
              if (idProfilDpa) {
                const payload = {
                  idProfilDpa,
                  deviceToken: [
                    {
                      accessToken: fcm.token,
                    },
                  ],
                };
                this.store.dispatch(SetTokenFcm({ payload }));

                this.HandleSaveUserSession(fcm.token);

                this.store.dispatch(
                  ToggleNotification({ payload: { notificationToggle: '1' } })
                );

                this.storageService.setStorage(
                  StorageKeyEnum.TOKEN_STORED,
                  true
                );
              }
            })
            .catch((err) => {});
        }

        if (Capacitor.getPlatform() === 'android') {
          await PushNotifications.createChannel({
            id: 'DPA_channel_fcm',
            name: 'DPA FCM',
            sound: 'mixkit.wav',
            vibration: true,
            importance: 4,
            visibility: 1,
          }).then(async (res) => {});

          // On success, we should be able to receive notifications
          PushNotifications.addListener(
            'registration',
            async (token: Token) => {
              const idProfilDpa = await this.storageService.getStorage(
                StorageKeyEnum.ID_PROFILE_DPA
              );
              if (idProfilDpa) {
                const payload = {
                  idProfilDpa,
                  deviceToken: [
                    {
                      accessToken: token.value,
                    },
                  ],
                };
                this.store.dispatch(SetTokenFcm({ payload }));

                this.HandleSaveUserSession(token.value);

                this.store.dispatch(
                  ToggleNotification({ payload: { notificationToggle: '1' } })
                );

                this.storageService.setStorage(
                  StorageKeyEnum.TOKEN_STORED,
                  true
                );
              }
            }
          );

          // PushNotifications.addListener(
          //   'pushNotificationReceived',
          //   (notification: PushNotificationSchema) => {
          //     notification.c
          //     console.log(notification, 'test');
          //   }
          // );
        }
      } else {
        this.HandleSaveUserSession(null);
      }
    }
  }

  public async HandleSaveUserSession(token: any) {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const noPeserta = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );

    const saveUserSession: any = {
      idProfilDpa: idProfilDpa,
      accessToken: token,
      ...noPeserta,
    };

    this.store.dispatch(SaveUserSession({ payload: saveUserSession }));
  }

  public handleFetchToken(meta: {
    path: string;
    accessable?: boolean;
    callback?: string;
  }): Observable<any> {
    const token = this.storageService.getStorage(StorageKeyEnum.TOKEN);

    if (token) {
      return this.authService.refreshToken(true).pipe(
        filter((refreshToken) => !!refreshToken),
        take(1),
        map((res) => {
          this.storageService.setStorage(
            StorageKeyEnum.TOKEN,
            res?.data?.token
          );
          this.storageService.setStorage(
            StorageKeyEnum.REFRESH_TOKEN,
            res?.data?.refreshToken
          );
          this.storageService.setStorage(
            StorageKeyEnum.TIMESTAPM,
            res?.data?.timestamp
          );

          return true;
        }),
        catchError(({ error }) => {
          if (error?.code == '01') {
            return of(true);
          }

          if (error?.code == '02') {
            this.storageService.clearStorage();
            this.handleResetAllState();

            if (meta?.accessable) {
              return of(true);
            }

            this.router.navigate([meta?.callback || '/home']);
            return of(false);
          }

          if (error?.code == '03') {
            if (meta?.accessable) {
              return of(true);
            }

            this.router.navigate([meta?.callback || '/home']);
            return of(false);
          }

          return of(false);
        })
      );
    }

    if (meta?.accessable) {
      return of(true);
    }

    this.router.navigate([meta?.callback || '/home']);
    return of(false);
  }
}
