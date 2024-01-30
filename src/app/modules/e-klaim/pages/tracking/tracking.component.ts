import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ComponentType } from '@components/common';
import { DetailProfile } from '@controllers/profile';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { DataResponse, InteractionState } from '@shared';
import {
  ProfileRepository,
  ProfileInteractionRepository,
} from '@stores/profile';
import { EklaimTrackService } from 'libs/controllers/e-klaim/services/e-klaim-track.service';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { ProfileState } from 'libs/stores/profile/states/profile.state';
import { Observable, map } from 'rxjs';
import { AppComponentService } from 'src/app/app.component.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit {
  public response$: Observable<DataResponse<DetailProfile> | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;

  public type: typeof ComponentType = ComponentType;
  @HostListener('window:resize')
  public onResize() {
    this.getComponentType();
    this.initHeader();
  }

  public getComponentType(): ComponentType {
    const win = window;

    if (win.innerWidth <= 640) {
      return this.type.SMALL;
    }

    if (win.innerWidth > 640 && win.innerWidth <= 1024) {
      return this.type.MEDIUM;
    }

    return this.type.LARGE;
  }

  constructor(
    private store: Store<ProfileState>,
    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    private eklaimTrackServices: EklaimTrackService,
    private sanitizer: DomSanitizer,
    public screenSizeService: ScreenSizeService,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService,
    public appService: AppComponentService,
    private parent: IonContent,
    public templateService: AppMainTemplateService
  ) {
    this.response$ = this.profileRepository.postEditProfilData$();
    this.interactionResponse$ =
      this.profileInteractionRepository.postEditProfileInteraction$();
    this.initHeader();
  }

  initHeader = () => {
    this.templateService.handleInit();
    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none text-800'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('Tracking e-Klaim');
    this.templateService.handleUseSecondaryHeader(true);
  };

  async ngOnInit() {
    this.appService.handleShowLoadingPending(true, 'init tracking page');
    this.cdr.markForCheck();
    this.initHeader();
    const noPeserta = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    this.submit(noPeserta);
  }

  safeHtml!: SafeHtml;
  submit(noPeserta: any) {
    const payload = {
      isMobile: '1',
      KdPeserta: noPeserta?.noPeserta,
      Password: noPeserta?.eklm,
    };
    this.eklaimTrackServices.postTrackEklaim(payload).subscribe(
      (res: any) => {
        this.appService.handleShowLoadingPending(
          false,
          'eklaim success track  page'
        );
        this.parent.scrollToTop(0);
      },
      (err) => {
        this.appService.handleShowLoadingPending(
          false,
          'eklaim failed track  page'
        );
        this.parent.scrollToTop(0);
        if (err.error) {
          this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(
            err.error.text
          );
          this.cdr.markForCheck();
          return;
        }
      }
    );
  }
}
