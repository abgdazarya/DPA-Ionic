import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BaseProfile,
  Notification,
  NotificationData,
  SetNotification,
  UserInfo,
} from '@controllers/profile';

import { Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { ProfileState } from 'libs/stores/profile/states/profile.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'common-header-component',
  templateUrl: './header.component.html',
  providers: [ProfileRepository, ProfileInteractionRepository, StorageService],
})
export class HeaderComponent implements OnInit {
  @Input() useSecondaryHeader: boolean = false;
  @Input() pageTitle: string = 'Welcome';

  public response$!: Observable<NotificationData[] | undefined | null>;
  public profile$: Observable<BaseProfile | undefined | null>;
  public interactionResponse$!: Observable<InteractionState | undefined | null>;
  public isOpenNotif: boolean = false;

  constructor(
    private store: Store<ProfileState>,
    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,

    private storageService: StorageService,
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute,
    public screenSizeService: ScreenSizeService
  ) {
    this.profile$ = this.profileRepository.getUserInfoData$();
    // this.response$ = this.profileRepository.getNotificationData$();
    // this.interactionResponse$ =
    //   this.profileInteractionRepository.getNotificationInteraction$();
  }

  ngOnInit(): void {
    this.fetchNotif();
    this.fetchProfile();
    this.activeRoute.params.subscribe((routeParams) => {
      this.fetchProfile();
    });
  }

  public async handleNavigateProfile() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    if (idProfilDpa) {
      this.router.navigateByUrl('/profile');
    } else {
      this.router.navigateByUrl('login');
    }
  }

  async fetchNotif() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const payload = { idProfilDpa };
    // this.store.dispatch(Notification({ payload }));
  }

  async fetchProfile() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = {};
    this.store.dispatch(UserInfo({ payload }));
  }

  public async readNotif(notif: NotificationData) {
    if (!notif.idProfilDpa) return;
    const payload: any = {
      // idProfilDpa: notif.idProfilDpa,
      idNotif: notif.idNotif,
      flagRead: '1',
      allRead: '0',
    };
    await this.store.dispatch(SetNotification({ payload }));
    await this.fetchNotif();
  }

  public async readNotifAll() {
    const idProfilDpa = this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload: any = {
      // idProfilDpa,
      idNotif: '',
      flagRead: '1',
      allRead: '1',
    };
    await this.store.dispatch(SetNotification({ payload }));
    await this.fetchNotif();
  }

  public onClickBack(): void {
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
}
