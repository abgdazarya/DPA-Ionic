import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { AstraHubData, GetAstraHub } from '@controllers/menu';
import { isPlatform, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { DataResponseArray, InteractionState } from '@shared';
import { MenuInteractionRepository, MenuRepository } from '@stores/menu';
import { RateDirectionsModalComponent } from 'libs/components/profile/modals/rate-directions-modal/rate-directions-modal.component';
import { NavigationService } from 'libs/services/common/navigation.service';
import { MenuState } from 'libs/stores/menu/states/menu.state';
import { Observable } from 'rxjs';
import { astraHubs } from './astra-hub-const';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Component({
  selector: 'app-astra-hub',
  templateUrl: './astra-hub.page.html',
  styleUrls: ['./astra-hub.page.scss'],
  providers: [MenuRepository, MenuInteractionRepository],
})
export class AstraHubPage implements OnInit {
  astraData = astraHubs;
  astraHubsTitle: string[] = [];
  public response$: Observable<
    DataResponseArray<AstraHubData> | undefined | null
  >;
  public interactionResponse$: Observable<InteractionState | undefined | null>;
  constructor(
    private store: Store<MenuState>,
    private menuRepository: MenuRepository,
    private menuInteractionRepository: MenuInteractionRepository,
    private navigationService: NavigationService,
    private modalCtrl: ModalController,
    public templateService: AppMainTemplateService,
    public screenSizeService: ScreenSizeService,
    private cdr: ChangeDetectorRef
  ) {
    this.astraHubsTitle = this.astraData.map((astra) => astra.title);
    this.response$ = this.menuRepository.getAstraHub$();
    this.interactionResponse$ =
      this.menuInteractionRepository.getAstraHubInteraction$();
  }

  @HostListener('window:resize')
  public onResize() {
    this.handleChangeTemplateService();
  }

  handleChangeTemplateService() {
    this.templateService.handleInit();

    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none text-800'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('AstraHub');
    this.templateService.handleUseSecondaryHeader(true);
    this.cdr.markForCheck();
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.handleChangeTemplateService();
    }, 0);

    this.store.dispatch(GetAstraHub({}));
  }

  navigateApp(
    appStore: string | null | undefined,
    playStore: string | null | undefined
  ) {
    if (isPlatform('desktop')) {
      this.performDirectionModal(appStore, playStore);
      return;
    }
    this.navigationService.openUrl(
      isPlatform('android') ? playStore! : isPlatform('ios') ? appStore! : ''
    );
  }
  async performDirectionModal(
    appStore: string | null | undefined,
    playStore: string | null | undefined
  ) {
    const modal = await this.modalCtrl.create({
      component: RateDirectionsModalComponent,
      cssClass: 'modal-web ion-background-white option',
      componentProps: {
        title: 'Download di sini:'
      }
    });
    modal.present();

    modal.onDidDismiss().then(({ data }) => {
      if (data === 'playstore') this.navigationService.openUrl(playStore!);
      if (data === 'appstore') this.navigationService.openUrl(appStore!);
    });
  }
}
