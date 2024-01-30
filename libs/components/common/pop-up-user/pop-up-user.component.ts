import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BaseProfile,
  DetailProfile,
  NotificationData,
} from '@controllers/profile';
import { Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { StorageService } from 'libs/services/common/storage.service';

import { ProfileState } from 'libs/stores/profile/states/profile.state';
import { Observable } from 'rxjs';

interface ActionButtonProfile {
  href?: string;
  action?: any;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-pop-up-user-component',
  templateUrl: './pop-up-user.component.html',
})
export class PopUpUserComponent {
  @Input() profile$: Observable<BaseProfile | undefined | null> | null = null;
  @Input() profileDetail$: Observable<DetailProfile | undefined | null> | null =
    null;
  @Input() loadingProfile$: Observable<boolean | undefined | null> | null =
    null;

  @Input() response$: Observable<NotificationData[] | undefined | null> | null =
    null;
  @Input() interactionResponse$: Observable<
    InteractionState | undefined | null
  > | null = null;
  public isOpenProfile: boolean = false;

  constructor(
    private store: Store<ProfileState>,
    private profileRepo: ProfileRepository,
    private profileInteractionRepo: ProfileInteractionRepository,
    private storageService: StorageService,
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute,
    public screenSizeService: ScreenSizeService
  ) {}

  renderActionButton = (): ActionButtonProfile[] => {
    return [
      {
        href: '/profile/help',
        label: 'Pusat Bantuan DPA',
        icon: 'chat-conversation',
      },
      {
        href: '/profile/privacy',
        label: 'Kebijakan Privasi',
        icon: 'book-1',
      },
      {
        href: '/profile/settings',
        label: 'Pengaturan',
        icon: 'settings-1',
      },
      {
        href: '/profile/rate',
        label: 'Nilai Kami',
        icon: 'star-outline',
      },
      {
        label: 'Keluar',
        icon: 'log-out',
        action: this.logout,
      },
    ];
  };

  generateNickName = (str: string | any) => {
    if (!str) return '';
    let nickName = '';
    const arr: Array<any> = str.split(' ');
    for (let i = 0; i < arr.length; i++) {
      nickName += `${arr[i][0]}`;
      if (i > 1) break;
    }
    return nickName;
  };

  logout = async () => {
    this.storageService.clearStorage();
    window.location.replace('/home');
  };
}
