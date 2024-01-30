import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileUserCardModal } from '@components/profile';
import {
  DetailProfile,
  KartuPeserta,
  KartuPesertaData,
} from '@controllers/profile';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { InteractionState, decryptContent } from '@shared';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import * as dayjs from 'dayjs';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { ProfileState } from 'libs/stores/profile/states/profile.state';
import { Observable } from 'rxjs';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-card',
  templateUrl: 'profile-card.page.html',
  styleUrls: ['profile-card.page.scss'],
})
export class ProfileCardPage implements OnInit, OnDestroy {
  public response$: Observable<KartuPesertaData | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;
  public responseUser$: Observable<DetailProfile | undefined | null>;
  isProduction: boolean = false;
  public constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private store: Store<ProfileState>,
    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    public storageService: StorageService,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    private cdr: ChangeDetectorRef
  ) {
    this.isProduction = environment.production;

    this.response$ = this.profileRepository.getKartuPesertaData$();
    this.interactionResponse$ =
      this.profileInteractionRepository.getKartuPesertaInteraction$();
    this.responseUser$ = this.profileRepository.getUserDetailData$();
  }

  public decryptNoPes(noPes: string | undefined | null) {
    return decryptContent(<string>noPes);
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
    this.templateService.handleChangePageTitle('Kartu Peserta DPA');
    this.templateService.handleUseSecondaryHeader(true);
  };

  async ngOnInit() {
    setTimeout(() => {
      this.onInitTheme();
      this.cdr.markForCheck();
    }, 0);

    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const noPeserta = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );

    if (!idProfilDpa && !noPeserta) return;
    const payload = {
      idAccountDpa: noPeserta?.idAccount,
    };
    this.store.dispatch(KartuPeserta({ payload }));
    this.handlePageChange();
  }

  ngOnDestroy(): void {}

  async handleOpenUserCardModal() {
    let kartuPesertaData: KartuPesertaData | null | undefined;
    this.response$.subscribe((data) => (kartuPesertaData = data));
    const modal = await this.modalCtrl.create({
      component: ProfileUserCardModal,
      cssClass: 'modal-web ion-background-white',
      componentProps: {
        kartuPesertaData: {
          ...kartuPesertaData,
          namaPeserta: this.renderName(kartuPesertaData?.namaPeserta || ''),
        },
      },
    });
    modal.present();
  }

  getDate = (date: any = '1995-7-6'): string => {
    if (!date) return '-';
    return dayjs(date).format('DD-MMM-YYYY');
  };

  public handlePageChange(): void {
    const el: any = document.querySelector('.page-container-main');
    if (el) {
      el.scrollToTop?.();
    }
  }

  renderName = (str: string | any) => {
    const arr = str.split?.(' ') || [];
    let tempName = [];
    for (let i = 0, length = arr.length; i < length; i++) {
      tempName.push(arr[i]);
      if (i >= 2) {
        break;
      }
    }

    return tempName.join(' ');
  };
}
