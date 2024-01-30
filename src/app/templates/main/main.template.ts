import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LogUserActivity } from '@controllers/auth';
import {
  GetLink,
  LinkData,
  UserDetailInteractionReset,
  UserDetailReset,
  UserInfoInteractionReset,
  UserInfoReset,
  UserInfoSucceed,
} from '@controllers/profile';

import { Store } from '@ngrx/store';
import {
  DATA_RESPONSE_INITIAL_STATE,
  DataResponse,
  INITIAL_INTERACTION_STATE,
} from '@shared';
import { AuthRepository } from '@stores/auth';
import { ProfileRepository } from '@stores/profile';
import { RefreshToken } from 'libs/controllers/auth/action/commands/refresh-token';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable, Subscription, distinct, filter, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppMainTemplateService } from './main.template.service';
import { Capacitor } from '@capacitor/core';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { DeviceDetectorService } from 'ngx-device-detector';
import {
  AndroidPermissionResponse,
  AndroidPermissions,
} from '@awesome-cordova-plugins/android-permissions/ngx';
@Component({
  selector: 'app-main-template',
  templateUrl: 'main.template.html',
  styleUrls: ['main.template.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthRepository],
})
export class AppMainTemplate implements OnInit, OnDestroy {
  subs = new Subscription();

  public response$: Observable<DataResponse<LinkData> | undefined | null>;
  public waUrl: string | null | undefined = '';
  pathData: any = {};

  constructor(
    private store: Store,
    private router: Router,
    private storageService: StorageService,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    private location: Location,
    private profileRepository: ProfileRepository,
    private authRepo: AuthRepository,
    private device: Device,
    private deviceService: DeviceDetectorService,
    private androidPermissions: AndroidPermissions,
    private cdr: ChangeDetectorRef
  ) {
    this.response$ = this.profileRepository.getLink$();
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        let currentPageName = await this.getCurrentPageName();

        let urlMenu = environment.urlWeb + event.urlAfterRedirects;
        if (currentPageName != this.pathData.menu) {
          const idProfilDpa = await this.storageService.getStorage(
            StorageKeyEnum.ID_PROFILE_DPA
          );
          let device = null;
          let os = null;
          let browser = null;
          if (
            Capacitor.getPlatform() == 'android' ||
            Capacitor.getPlatform() == 'ios'
          ) {
            device = this.device.manufacturer
              ? this.device.manufacturer + ' ' + this.device.model
              : null;
            os = this.device.manufacturer
              ? this.device.platform + ' ' + this.device.version
              : null;
          } else {
            const regex = /\((.*?)\)/;
            const match = regex.exec(deviceService.userAgent);
            let matches = match ? match[1] : null;

            device = this.deviceService.device
              ? this.deviceService.device == 'Unknown' ||
                this.deviceService.device == 'unknown'
                ? this.deviceService.os
                : this.deviceService.device
              : null;
            browser = this.deviceService.browser
              ? this.deviceService.browser +
                ' ' +
                this.deviceService.browser_version
              : null;
            os = matches
              ? this.deviceService.os_version == 'Unknown' ||
                this.deviceService.os_version == 'unknown'
                ? matches
                : this.deviceService.os_version
              : this.deviceService.os;
          }

          if (idProfilDpa) {
            this.pathData = {
              menu: currentPageName,
              urlMenu: urlMenu,
              device: device,
              browser: browser,
              os: os,
            };
            const payload = {
              menu: currentPageName,
              urlMenu: urlMenu,
              device: device,
              browser: browser,
              os: os,
            };

            this.store.dispatch(LogUserActivity({ payload }));
            // this.getRefreshToken();
          }
        }
      }
    });
  }

  handleInteractionToken(): void {
    const interaction = this.authRepo
      .tokenResponse$()
      .pipe(
        filter((res) => !!res),
        distinct((e) => e?.code),
        tap((res: any) => {
          if (res?.code === '12') {
            // console.log(res, 'the trigger');
            // console.log(res?.from);
            // if (res?.from) {
            //   this.store.dispatch(
            //     UserInfoSucceed({ response: DATA_RESPONSE_INITIAL_STATE })
            //   );
            //   this.store.dispatch(
            //     UserInfoInteractionReset({
            //       response: INITIAL_INTERACTION_STATE,
            //     })
            //   );
            //   return;
            // }
            // if (this.router.url.includes('pensiun')) {
            //   console.log('data');
            //   this.store.dispatch(
            //     UserInfoSucceed({ response: DATA_RESPONSE_INITIAL_STATE })
            //   );
            //   this.store.dispatch(
            //     UserInfoInteractionReset({
            //       response: INITIAL_INTERACTION_STATE,
            //     })
            //   );
            //   this.storageService.clearStorage();
            //   return;
            // }
            // this.router.navigate(['/authentication'], {
            //   queryParams: { previous: this.router.url },
            // });
          }
        })
      )
      .subscribe();

    this.subs.add(interaction);
  }

  getRefreshToken = () => {
    this.store.dispatch(RefreshToken({}));
  };

  getCurrentPageName(): Promise<string> {
    return new Promise((resolve) => {
      let currentPageName = '';

      this.templateService.pageTitle$.pipe(take(1)).subscribe((res) => {
        currentPageName = res ? res : this.router.url.replace('/', '');
        resolve(currentPageName);
      });
    });
  }

  fetchWaStoreLink() {
    const payload = { condition: 'LINK_WHATSAPP' };
    this.store.dispatch(GetLink({ payload }));
    this.response$.subscribe((res) => {
      if (res?.data?.condition === 'LINK_WHATSAPP') {
        this.waUrl = res?.data?.description;
        this.cdr.markForCheck();
      }
    });
  }

  public async navigateToQuiz(): Promise<void> {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (idProfilDpa) {
      this.router.navigate(['quiz']);
    } else {
      this.storageService.clearStorage();

      this.router
        .navigate(['/login'], {
          onSameUrlNavigation: 'reload',
          replaceUrl: true,
        })
        .then(() => {
          this.location.replaceState('/login');
        });
    }
  }

  public async navigateToProfile(): Promise<void> {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    if (idProfilDpa) {
      this.router.navigate(['quiz']);
    } else {
      this.storageService.clearStorage();

      this.router
        .navigate(['/login'], {
          onSameUrlNavigation: 'reload',
          replaceUrl: true,
        })
        .then(() => {
          this.location.replaceState('/login');
        });
    }
  }

  ngOnInit() {
    this.handleInteractionToken();
    this.fetchWaStoreLink();
    this.requestAccessToAudioStorage();
    // this.na
  }

  public async requestAccessToAudioStorage(): Promise<boolean> {
    let response: AndroidPermissionResponse;
    if (Number(this.device.sdkVersion) >= 33) {
      response = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_MEDIA_AUDIO
      );
    } else {
      response = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
      );
    }

    return response.hasPermission;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  handleScroll = (event: any) => {};
}
