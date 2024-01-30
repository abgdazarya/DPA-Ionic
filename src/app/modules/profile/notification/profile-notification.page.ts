import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import {
  Notification,
  NotificationData,
  NotificationEnum,
  ResetNotification,
  SetNotification,
} from '@controllers/profile';
import { IonContent, ModalController, Platform } from '@ionic/angular';
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
import { Observable, filter, map } from 'rxjs';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

export interface LodaingDataStatus {
  isLoading: boolean | any;
  isError: boolean | any;
  totalPage?: number | any;
}

@Component({
  selector: 'app-profile-notification',
  templateUrl: 'profile-notification.page.html',
  styleUrls: ['profile-notification.page.scss'],
})
export class ProfileNotificationPage implements OnInit, OnDestroy {
  @ViewChild('targetScrollPos') targetScrollPos: any;
  public response$: Observable<NotificationData[] | undefined | null>;
  public interactionResponse$: Observable<boolean | undefined | null>;
  public pagination$: Observable<Pagination | undefined | null>;
  private targetPage: number = 1;
  public lodaingDataStatus: LodaingDataStatus = {
    isLoading: false,
    isError: false,
  };

  public interactionSetNotif$: any;

  constructor(
    private store: Store<ProfileState>,
    private profileRepo: ProfileRepository,
    private profileInteractionRepo: ProfileInteractionRepository,
    private storageService: StorageService,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private parent: IonContent,
    private platform: Platform,
    private modalCtrl: ModalController
  ) {
    this.onInitTheme();
    this.response$ = this.profileRepo.getNotificationList$().pipe(
      filter((res) => !!res),
      map((res) => {
        this.lodaingDataStatus.isLoading = false;
        if (!res?.data?.data.length) return null;
        this.lodaingDataStatus.totalPage = res?.data?.pagination?.totalPage;
        return res?.data?.data;
      })
    );

    this.interactionResponse$ = this.profileInteractionRepo
      .getNotificationListInteraction$()
      .pipe(
        map((res) => {
          this.lodaingDataStatus = {
            isLoading: res?.isLoading,
            isError: res?.error ? true : false,
          };
          return res?.isLoading;
        })
      );

    this.pagination$ = this.profileRepo.getNotificationList$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.pagination) return null;
        return res?.data?.pagination;
      })
    );

    this.interactionSetNotif$ = this.profileInteractionRepo
      .setNotificationInteraction$()
      .subscribe((e) => {
        if (!e?.isLoading) {
          this.fetchNotif(this.targetPage);
        }
      });
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
    this.templateService.handleChangePageTitle('Notifikasi');
    this.templateService.handleUseSecondaryHeader(true);
    this.templateService.handleRightBtnClick(
      this.readNotifAll,
      '',
      'Tandai Semua Dibaca'
    );
    this.cdr.markForCheck();
  };

  ngOnInit(): void {
    setTimeout(async () => {
      await this.store.dispatch(ResetNotification({ dataType: 'list' }));
      this.onInitTheme();
      this.templateService.handleOnBack(() => {
        this.router.navigate(['/home'], { onSameUrlNavigation: 'reload' });
      });
      // this.cdr.markForCheck();
    }, 0);

    this.fetchNotif();
    this.handlePageChange(1);
    this.createEventScrollListener();
    this.targetPage = 1;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.templateService.handleOnBack(undefined);
    this.interactionSetNotif$.unsubscribe();
    this.clearEventScrollListener();
  }

  public async handlePageChange(page: number = 1) {
    await this.store.dispatch(ResetNotification({ dataType: 'list' }));
    this.fetchNotif(page);
    const el: any = document.querySelector('.page-container-main');
    if (el) {
      el.scrollToTop?.();
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  fetchNotif = async (page: number = 1, append?: boolean) => {
    this.lodaingDataStatus = {
      isLoading: true,
      isError: false,
    };
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = { page, limit: 10 };
    this.store.dispatch(Notification({ payload, dataType: 'list', append }));
  };

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
    await this.store.dispatch(ResetNotification({ dataType: 'list' }));
    this.targetPage = 1;
    this.lodaingDataStatus.isLoading = true;

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

  public readNotifAll = async () => {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = {
      idNotif: '',
      flagRead: '1',
      allRead: '1',
    };
    await this.store.dispatch(SetNotification({ payload }));
    await this.store.dispatch(ResetNotification({ dataType: 'list' }));
    this.targetPage = 1;
    this.lodaingDataStatus.isLoading = true;
    // await this.fetchNotif();
  };

  public readAllNotif = async () => {
    const payload = {
      flagRead: '1',
    };
    // await this.store.dispatch(SetNotification({ }));
    await this.fetchNotif();
  };

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

  private parentEventListener: any = null;
  createEventScrollListener = () => {
    if (this.screenSizeService.isDesktopNativeResolution()) return;
    this.parentEventListener = this.parent?.ionScroll.subscribe(
      this.onScrollListener
    );
  };

  clearEventScrollListener = () => {
    if (this.parentEventListener) {
      this.parentEventListener.unsubscribe();
    }
  };

  goToClientScroll = () => {
    const { top, y } =
      this.targetScrollPos?.nativeElement?.getBoundingClientRect() || {};
    this.parent.scrollToBottom(top);
  };

  onScrollListener = async (e: any) => {
    const { top, y } =
      this.targetScrollPos?.nativeElement?.getBoundingClientRect() || {};
    if (
      top <= this.platform.height() &&
      !this.lodaingDataStatus.isLoading &&
      this.targetPage < this.lodaingDataStatus.totalPage
    ) {
      this.targetPage = this.targetPage + 1;
      await this.fetchNotif(this.targetPage, true);
    }
  };
}
