import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { CapacitorJailbreakRootDetection } from '@evehr/capacitor-jailbreak-root-detection';
import {
  Gesture,
  GestureController,
  IonModal,
  IonRouterOutlet,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { Browser } from '@capacitor/browser';
import { PushNotifications } from '@capacitor/push-notifications';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { SetNotification } from '@controllers/profile';
import { Store } from '@ngrx/store';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { PreviewPdfComponent } from 'libs/components/common/preview-pdf/preview-pdf.component';
import { StorageService } from 'libs/services/common/storage.service';
import { ProfileState } from 'libs/stores/profile/states/profile.state';
import { Subscription } from 'rxjs';
import { AppComponentService } from './app.component.service';
import { App } from '@capacitor/app';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
// import { AnalyticsService } from './providers/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('ionApp', { read: ElementRef })
  private ionAppEl!: ElementRef;
  @ViewChild(IonModal, { read: ElementRef })
  private ionModalEl!: ElementRef<HTMLIonModalElement>;

  private subscribtions = new Subscription();
  private lastBack: any = null;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  constructor(
    public platform: Platform,
    private storageService: StorageService,
    private router: Router,
    private store: Store<ProfileState>,
    public appComponentService: AppComponentService,
    private location: Location,
    private modalCtrl: ModalController,
    private gestureCtrl: GestureController,
    private toastCtrl: ToastController,
    private http: HTTP,
    public screenSizeService: ScreenSizeService,

    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    defineCustomElements(window);
    this.initializeFirebase();
    this.initializeApp()
  }

  'mobile': 'browser';

  ngOnInit() {
    this.checkIsRootedDevice();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.screenSizeService.isMobileResolution()){
        this.http.setServerTrustMode("pinned")
        .then(() => {
          console.log("Congratulation you have set up SSL Pinning.")
        })
        .catch( err => {
          console.error("Opss, SSL pinning failed. " + err)
        });
      }
    });
  }

  checkIsRootedDevice() {
    this.platform.ready().then(() => {
      CapacitorJailbreakRootDetection.isJailbrokenOrRooted().then(
        (res: any) => {
          if (res.result) {
            this.router
              .navigate(['/device-rooted'], {
                onSameUrlNavigation: 'reload',
                replaceUrl: true,
              })
              .then(() => {
                this.location.replaceState('/device-rooted');
              });
          }
        }
      );
    });
  }

  handleNavigate(): void {
    const mainUrls = [
      '/profile',
      '/astra-hub',
      '/dpatv',
      '/news',
      '/astramagazine',
      '/job',
      '/investasi',
      '/pensiun',
      '/promotion',
      '/simulasi-mp',
      '/saldo',
      '/e-klaim',
      '/quiz',
    ];

    const profilePageUrls = [
      mainUrls[0] + '/bio',
      // mainUrls[0] + '/card',
      // mainUrls[0] + '/notification',
      // mainUrls[0] + '/help',
      // mainUrls[0] + '/rate',
      // mainUrls[0] + '/settings',
      // mainUrls[0] + '/privacy',
    ];

    const pensiunPageUrls = [
      mainUrls[7] + '/activityOne',
      mainUrls[7] + '/transactionOne',
      mainUrls[7] + '/categoryOne',
      mainUrls[7] + '/friendOne',
    ];

    const pensiunDetailPageUrls = [mainUrls[7] + '/detail'];
    // const newsPageUrls = [mainUrls[3] + '/index'];

    // const astramagazinePageUrls = [mainUrls[4] + '/index'];

    // const paramsSnapshot = this.route.snapshot.params;

    // Main URL
    // if (mainUrls.includes(this.router.url)) {
    //   this.router.navigateByUrl('/home');
    //   return;
    // }

    // Profile URL
    if (profilePageUrls.includes(this.router.url)) {
      this.router.navigateByUrl('/profile');
      return;
    }
    // // Profile URL
    // if (profilePageUrls.includes(this.router.url)) {
    //   this.router.navigateByUrl('/profile');
    //   return;
    // }

    // // News URL
    // if (newsPageUrls.includes(this.router.url)) {
    //   this.router.navigateByUrl('/home');
    //   return;
    // }

    // if (paramsSnapshot['idBeritaDpa']) {
    //   this.router.navigateByUrl('/news');
    //   return;
    // }

    // // Astramagazine URL
    // if (astramagazinePageUrls.includes(this.router.url)) {
    //   this.router.navigateByUrl('/home');
    //   return;
    // }

    // // Job URL
    // if (paramsSnapshot['idJob']) {
    //   this.router.navigateByUrl('/job');
    //   return;
    // }

    // // Investasi URL
    // if (paramsSnapshot['idLaporanInvestasi']) {
    //   this.router.navigateByUrl('/investasi');
    //   return;
    // }

    // Profile to Home URL
    if (this.router.url == '/profile') {
      this.router.navigateByUrl('/home');
      return;
    }

    // Pensiun to Home URL
    if (this.router.url == '/pensiun') {
      this.router.navigateByUrl('/home');
      return;
    }

    // Pensiun to index URL
    if (this.router.url.includes('/detail/activity')) {
      this.router.navigateByUrl('/pensiun/activityOne');
      return;
    }

    if (this.router.url.includes('/detail/transaction')) {
      this.router.navigateByUrl('/pensiun/transactionOne');
      return;
    }

    if (this.router.url.includes(mainUrls[7] + '/friendOne')) {
      this.router.navigateByUrl('/pensiun');
      return;
    }

    // Pensiun to Home URL
    if (pensiunPageUrls.includes(this.router.url)) {
      this.router.navigateByUrl('/pensiun');
      return;
    }

    if (this.router.url === '/home') {
      if (this.lastBack && Date.now() - this.lastBack < 2000) {
        // logic for double tap: delay of 500ms between two clicks of back button
        App.exitApp();

        return;
      }
      this.handleShowToastExit();
      this.lastBack = Date.now();
    }

    this.location.back();
  }

  async handleShowToastExit() {
    const toast = await this.toastCtrl.create({
      message: `${
        Capacitor.getPlatform() === 'android' ? 'klik' : 'geser'
      }  sekali lagi untuk keluar dari aplikasi.`,
      duration: 2000,
      position: 'bottom',
      mode: 'ios',
    });
    await toast.present();
  }

  initializeFirebase() {
    this.platform.ready().then(async () => {
      await GoogleAuth.initialize({
        clientId:
          '747596971905-nhacnsrdk76jttc5vpcba68r22felfk5.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
      });

      SafeArea.getSafeAreaInsets().then(({ insets }) => {});

      SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {});

      const eventListener = await SafeArea.addListener(
        'safeAreaChanged',
        (data) => {
          const { insets } = data;
          for (const [key, value] of Object.entries(insets)) {
            setTimeout(() => {
              document.documentElement.style.setProperty(
                `--safe-area-${key}`,
                `${value}px`
              );
            }, 0);
          }
        }
      );
      eventListener.remove();

      if (Capacitor.getPlatform() === 'android') {
        setTimeout(() => {
          this.platform.backButton.subscribeWithPriority(100, async () => {
            const isModalOpened = await this.modalCtrl.getTop();

            if (isModalOpened) {
              this.modalCtrl.dismiss();
            } else {
              this.handleNavigate();
            }
          });
        }, 500);
      }

      if (Capacitor.getPlatform() === 'ios') {
        setTimeout(() => {
          const handleMove = async () => {
            const isModalOpened = await this.modalCtrl.getTop();

            if (isModalOpened) {
              this.modalCtrl.dismiss();
            } else {
              this.handleNavigate();
            }
          };

          const gesture: Gesture = this.gestureCtrl.create(
            {
              el: this.ionAppEl.nativeElement,
              threshold: 15,
              gestureName: 'my-gesture',
              onEnd: (ev) => {
                if (ev.startX < 100) {
                  handleMove();
                }
              },
            },
            true
          );

          gesture.enable();
        }, 500);
      }

      const handleShowAstramagazine = async (data: any) => {
        const urlPDF = data.LINK;

        if (Capacitor.getPlatform() == 'android') {
          const modal = await this.modalCtrl.create({
            component: PreviewPdfComponent,
            cssClass: 'modal-web ion-background-transparent ion-no-box-shadow',
            componentProps: {
              urlPDF: urlPDF,
            },
          });

          modal.onDidDismiss().then(async (res) => {
            if (res.data == 'download') {
              await Browser.open({
                url: urlPDF,
                presentationStyle: 'popover',
              }).then();
            }
          });
          modal.present();
        } else {
          await Browser.open({
            url: urlPDF,
            presentationStyle: 'popover',
          }).then();
        }
      };

      const handleRedirectYoutube = async (data: any) => {
        if (data?.LINK)
          await Browser.open({
            url: data?.LINK,
            presentationStyle: 'popover',
          });
      };

      if (Capacitor.getPlatform() != 'web') {
        await PushNotifications.addListener(
          'pushNotificationActionPerformed',
          (notification) => {
            const data: any = notification?.notification?.data;

            const payload: any = {
              idNotif: data?.ID_NOTIF,
              flagRead: '1',
              allRead: '0',
            };
            this.store.dispatch(SetNotification({ payload }));

            if (!data?.LINK) {
              this.router.navigateByUrl('/profile/notification');
              return;
            }

            if (data?.KATEGORI === 'NEW-ASTRAMAGAZINE') {
              handleShowAstramagazine(data);
            } else if (data?.KATEGORI === 'NEW-LAPORAN-INVESTASI') {
              this.router.navigateByUrl('/investasi');
            } else if (data?.KATEGORI === 'NEW-DPATV') {
              handleRedirectYoutube(data);
            } else {
              const url = data?.LINK?.split('.com')?.[1];
              this.router.navigateByUrl(url);
              return;
            }
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }
}
