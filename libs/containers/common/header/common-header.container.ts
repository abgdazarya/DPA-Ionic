import { Location } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import {
  BaseProfile,
  DetailProfile,
  Notification,
  NotificationData,
  NotificationEnum,
  SetNotification,
  UserInfo,
} from '@controllers/profile';
import { ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { InteractionState, Pagination } from '@shared';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { PreviewPdfComponent } from 'libs/components/common/preview-pdf/preview-pdf.component';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { ProfileState } from 'libs/stores/profile/states/profile.state';
import { Observable, filter, map, of } from 'rxjs';

@Directive({
  selector: '[buttonSecondaryHeader]',
  standalone: true,
})
export class ButtonSecondaryHeaderDirective {}

@Component({
  selector: 'app-common-header-container',
  templateUrl: './common-header.container.html',
  providers: [ProfileRepository, ProfileInteractionRepository, StorageService],
})
export class CommonHeaderContainer implements OnInit {
  @ContentChild(ButtonSecondaryHeaderDirective, { read: TemplateRef })
  public secondaryBtnTpl: any;
  @Input() onBack: (() => void) | any = undefined;
  @Input() useSecondaryHeader: boolean | undefined | null;
  @Input() pageTitle: string | undefined | null = 'Welcome';
  @Input() headerContainerClass: string | undefined | null = '';
  @Input() secondaryHeaderClass: string | undefined | null = '';
  @Input() rightBtnClick: (() => void) | any = undefined;
  @Input() readAllNotif: (() => void) | any = undefined;
  @Input() rightIcon: any = null;
  @Input() rightLabel: any = null;

  public profile$: Observable<BaseProfile | undefined | null>;
  public profileDetail$: Observable<DetailProfile | undefined | null>;
  public loadingProfile$: Observable<boolean | undefined | null>;

  public response$: Observable<NotificationData[] | undefined | null>;
  public interactionResponse$: Observable<boolean | undefined | null>;
  public pagination$: Observable<Pagination | undefined | null>;

  public isOpenNotif: boolean = false;
  public isOpenProfile: boolean = false;

  constructor(
    private store: Store<ProfileState>,
    private profileRepo: ProfileRepository,
    private profileInteractionRepo: ProfileInteractionRepository,
    private storageService: StorageService,
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute,
    public screenSizeService: ScreenSizeService,
    private modalCtrl: ModalController
  ) {
    this.profile$ = this.profileRepo.getUserInfoData$();
    this.profileDetail$ = this.profileRepo.getUserDetailData$();

    this.loadingProfile$ = this.profileInteractionRepo
      .getUserInfoInteraction$()
      .pipe(map((res) => res?.isLoading));

    this.response$ = this.profileRepo.getNotificationHeader$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.data.length) return null;
        return res?.data?.data;
      })
    );

    this.interactionResponse$ = this.profileInteractionRepo
      .getNotificationHeaderInteraction$()
      .pipe(
        map((res) => {
          return res?.isLoading;
        })
      );

    this.pagination$ = this.profileRepo.getNotificationHeader$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.pagination) return null;
        return res?.data?.pagination;
      })
    );
  }

  ngOnInit(): void {
    this.fetchNotif();
    this.fetchProfile();
    // this.activeRoute.params.subscribe((routeParams) => {
    //   this.fetchProfile();
    // });
  }

  public async navigateToLogin() {
    this.storageService.clearStorage();
    this.router.navigate(['login'], { onSameUrlNavigation: 'reload' });
  }

  public navigateToProfile(): void {
    // new rule please dont remove it
    // if (!this.screenSizeService.isMobileNativeResolution()) {
    //   this.openProfile();
    //   return;
    // }
    // end new rule

    this.router.navigate(['profile'], { onSameUrlNavigation: 'reload' });
  }

  public navigateToHome(): void {
    this.router.navigate(['home'], { onSameUrlNavigation: 'reload' });
  }

  async fetchNotif() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = { limit: 3 };
    this.store.dispatch(Notification({ payload, dataType: 'header' }));
  }

  async fetchProfile() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = {};
    this.store.dispatch(UserInfo({ payload }));
  }

  handleShowAstramagazine = async (data: any) => {
    const urlPDF = data?.link;

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

  handleRedirectYoutube = async (data: any) => {
    if (data?.link)
      await Browser.open({
        url: data?.link,
        presentationStyle: 'popover',
      });
  };

  public async readNotif(notif: NotificationData) {
    const payload = {
      idNotif: notif.idNotif,
      flagRead: '1',
      allRead: '0',
    };
    await this.store.dispatch(SetNotification({ payload }));
    await this.fetchNotif();

    this.isOpenNotif = false;

    if (!notif?.link) {
      this.router.navigateByUrl('/profile/notification');
      return;
    }

    if (notif?.kategori === 'NEW-ASTRAMAGAZINE') {
      this.handleShowAstramagazine(notif);
    } else if (notif?.kategori === 'NEW-LAPORAN-INVESTASI') {
      this.router.navigateByUrl('/investasi');
    } else if (notif?.kategori === 'NEW-DPATV') {
      this.handleRedirectYoutube(notif);
    } else {
      const url = notif?.link?.split('.com')?.[1];

      this.router.navigateByUrl(url);
      return;
    }
  }

  public async readNotifAll() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = {
      // idProfilDpa,
      idNotif: '',
      flagRead: '1',
      allRead: '1',
    };
    await this.store.dispatch(SetNotification({ payload }));
    await this.fetchNotif();
  }

  public onClickBack(): void {
    if (this.onBack) {
      this.onBack();
      return;
    }
    const arrLink = this.router.url?.split('/');
    arrLink.pop();
    if (arrLink.length <= 1) arrLink[0] = '/';
    const newLink = arrLink.join('/');
    this.router
      .navigate([newLink], { onSameUrlNavigation: 'reload' })
      .then(() => {
        this.location.replaceState(newLink);
      });
  }

  public openNotif(): void {
    this.isOpenNotif = !this.isOpenNotif;
  }

  goToNotif() {
    this.isOpenNotif = false;
    this.router.navigate(['/profile/notification']);
  }

  openProfile = (): void => {
    this.isOpenProfile = !this.isOpenProfile;
  };
}
