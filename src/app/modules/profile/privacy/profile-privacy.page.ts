import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrivacyPolicy } from '@controllers/profile';
import { Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { PrivacyData } from 'libs/controllers/profile/models/privacy';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { ProfileState } from 'libs/stores/profile/states/profile.state';
import { Observable } from 'rxjs';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-profile-privacy',
  templateUrl: 'profile-privacy.page.html',
  styleUrls: ['profile-privacy.page.scss'],
})
export class ProfilePrivacyPage implements OnInit, OnDestroy {
  public response$: Observable<PrivacyData[] | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;
  constructor(
    private store: Store<ProfileState>,
    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    public templateService: AppMainTemplateService,
    public screenSizeService: ScreenSizeService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.response$ = this.profileRepository.privacyPolicyData$();
    this.interactionResponse$ =
      this.profileInteractionRepository.privacyPolicyInteraction$();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.onInitTheme();
      this.cdr.markForCheck();
    }, 0);
    this.store.dispatch(PrivacyPolicy({}));
    this.handlePageChange();
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
    this.templateService.handleChangePageTitle('Kebijakan Privasi');
    this.templateService.handleUseSecondaryHeader(true);
  };
  public handlePageChange(): void {
    const el: any = document.querySelector('.page-container-main');
    if (el) {
      el.scrollToTop?.();
    }
  }

  ngOnDestroy(): void {}
}
