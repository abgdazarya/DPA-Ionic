import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ComponentType } from '@components/common';
import {
  FriendList,
  GetFriendList,
  GetFriendListReset,
  GetListJualBeliRuangPensiun,
  GetListPostinganRuangPensiun,
  JualBeliRuangPensiun,
  LaporanInvestasi,
  PostinganRuangPensiun,
} from '@controllers/menu';
import { ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  DATA_RESPONSE_INITIAL_STATE,
  DataResponse,
  DataResponsePagination,
  InteractionState,
  InteractionType,
  decryptContent,
} from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { MenuInteractionRepository, MenuRepository } from '@stores/menu';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable, Subscription, combineLatest, map, of, tap } from 'rxjs';
import { PageType, PensiunPageService } from '../pensiun-page.service';
import { NoPesertaData, StatusPesertaEnum } from '@controllers/auth';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { AjakPesertaModal } from 'libs/components/ruang-pensiun/modals/ajak-peserta/ajak-peserta.modal';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { Location } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { GetLink, LinkData } from '@controllers/profile';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';

@Component({
  selector: 'app-friend-one',
  templateUrl: './friend-one.page.html',
  styleUrls: ['./friend-one.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthRepository,
    AuthInteractionRepository,
    MenuRepository,
    MenuInteractionRepository,
  ],
})
export class FriendOnePage implements OnInit, OnDestroy {
  private subscribtions = new Subscription();
  private subscribtionsWaDPA = new Subscription();
  dataWaBisnis: any = {};

  public type: typeof ComponentType = ComponentType;

  @HostListener('window:resize')
  public onResize() {
    this.getComponentType();
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

  public friendList$: Observable<FriendList[] | undefined | null>;
  public interaction$: Observable<InteractionState | undefined | null>;

  public noPeserta$: Observable<NoPesertaData | undefined | null> = of(null);
  isLoading: boolean = true;
  public response$: Observable<DataResponse<LinkData> | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private router: Router,
    private menuRepository: MenuRepository,
    private menuInteractionRepository: MenuInteractionRepository,
    public storageService: StorageService,
    public pageService: PensiunPageService,
    public screenSizeService: ScreenSizeService,
    private location: Location,
    public templateService: AppMainTemplateService,
    private toast: ToastController,
    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    public cdr: ChangeDetectorRef
  ) {
    this.response$ = this.profileRepository.getLink$();
    this.interactionResponse$ =
      this.profileInteractionRepository.getLinkInteraction$();

    this.friendList$ = this.menuRepository.getFriendList$().pipe(
      map((res: DataResponsePagination<FriendList> | undefined | null) => {
        if (!res?.data?.data?.length) return null;
        const newData = res?.data?.data;
        return newData;
      })
    );

    this.interaction$ = this.menuInteractionRepository.getFriendList$();
  }

  isPensiunan: boolean = true;
  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.fetchDataWaBisnisDPA();
    this.pageService.handleChangePage('friend');
    setTimeout(() => {
      this.templateService.handleShowIconQuiz(false);
      this.templateService.handleChangeIonHeaderClass('');
      this.templateService.handleChangeSecondaryHeaderClass('text-800');
      this.templateService.handleChangeIonContentClass(
        this.screenSizeService.isDesktopNativeResolution()
          ? 'ion-background-white relative'
          : 'ion-background-white relative'
      );
      this.templateService.handleChangeHeaderContainerClass(
        this.screenSizeService.isDesktopNativeResolution()
          ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none'
          : 'bg-bg-0 h-[78px] text-800'
      );
      this.templateService.handleChangePageTitle('Cari Teman');
      this.templateService.handleUseSecondaryHeader(true);
      this.templateService.handleShowFooter(
        this.screenSizeService.isMobileResolution() ? false : true
      );
      this.cdr.markForCheck();
    }, 0);

    this.templateService.handleOnBack(() => {
      this.router
        .navigate(['/pensiun'], { onSameUrlNavigation: 'reload' })
        .then(() => {
          this.location.replaceState('/pensiun');
        });
    });

    const nomorPeserta = this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );

    if (nomorPeserta?.statusPeserta == StatusPesertaEnum.PENSIUNAN) {
      this.isPensiunan = true;
    } else {
      this.isPensiunan = false;
    }

    this.fetchFriendList();
  }

  fetchDataWaBisnisDPA() {
    const payload = { condition: 'LINK_WHATSAPP' };
    this.store.dispatch(GetLink({ payload }));
    this.subscribtionsWaDPA = this.response$.subscribe((res) => {
      if (res?.data?.condition === 'LINK_WHATSAPP')
        this.dataWaBisnis = res?.data;
    });
  }

  private timeOutTracker: any = null;
  keyword: any = '';
  onSearchChange = (event: any) => {
    clearTimeout(this.timeOutTracker);
    this.timeOutTracker = setTimeout(() => {
      if (event?.target?.value) {
        this.keyword = event.target.value;
      } else {
        this.keyword = '';
        this.fetchFriendList();
      }
    }, 500);
  };

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
    this.subscribtionsWaDPA.unsubscribe();
  }

  public decryptUser(content: any): any {
    if (content == false || !content) return null;
    return decryptContent(content);
  }

  friendError = '';
  async openCustomPopUpModal(item: any) {
    this.friendError = '';
    try {
      const modal = await this.modalCtrl.create({
        component: AjakPesertaModal,
        cssClass: this.screenSizeService.isDesktopResolution()
          ? 'modal-web ion-background-white'
          : 'modal-web ion-background-transparent',
      });
      modal.present();

      const modalData = await modal.onDidDismiss();
      const data = modalData.data; // Destructure the data from the resolved promise

      if (data && data.submitted) {
        let nomorDPA = this.dataWaBisnis.description
          ? this.dataWaBisnis.description
          : 'https://wa.me/+6287881815252';
        let namaPeserta = this.decryptUser(item.namaPeserta)
          ? this.decryptUser(item.namaPeserta)
          : '-';
        const encodedNamaPeserta = encodeURIComponent(namaPeserta);

        let message = `Halo%20saya%20kenal%20dengan%20${encodedNamaPeserta},%20saya%20bisa%20bantu%20untuk%20rekomendasi%20yang%20bersangkutan%20untuk%20klaim%20manfaat%20pensiunnya`;

        const url = `${nomorDPA}?text=${message}`;

        if (Capacitor.getPlatform() != 'ios') {
          const whatsappLink = document.getElementById(
            'whatsappLink'
          ) as HTMLAnchorElement;
          if (whatsappLink) {
            whatsappLink.href = url;
            whatsappLink.click();
          } else {
            window.open(url, '_blank');
          }
        } else {
          await Browser.open({ url: url });
        }
      }
    } catch (error) {
      const toast = await this.toast.create({
        message: JSON.stringify(error),
        duration: 1500,
        position: 'bottom',
        mode: 'ios',
      });
      await toast.present();
    }
  }

  public fetchFriendList(): void {
    const response = combineLatest([
      this.pageService.keyword$,
      of(this.storageService.getStorage(StorageKeyEnum.NOMOR_PESERTA)),
      of(this.storageService.getStorage(StorageKeyEnum.ID_PROFILE_DPA)),
    ])
      .pipe(
        tap(([keyword, noPeserta, idProfilDpa]) => {
          this.noPeserta$ = of(noPeserta);
          this.resetData();
          this.cdr.markForCheck();

          let payload = {
            ...noPeserta,
            search: keyword || '',
            limit: 10,
            page: 1,
            sort: 'ASC',
            sortBy: 'NAMA_PESERTA',
          };

          if (noPeserta) {
            this.store.dispatch(GetFriendList({ payload }));
          }

          setTimeout(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
          }, 500);
        })
      )
      .subscribe();

    this.subscribtions.add(response);
  }

  resetData = () => {
    this.store.dispatch(
      GetFriendListReset({
        response: DATA_RESPONSE_INITIAL_STATE,
      })
    );
  };

  public handleNavigateUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  handleDetailLaporanInvestasiClicked(laporan: LaporanInvestasi): void {
    this.router.navigate([`investasi/${laporan.idLaporanInvestasi}`], {
      queryParamsHandling: 'merge',
    });
    if (laporan.pdf) {
      // await Browser.open({
      //   url: laporan.pdf,
      //   presentationStyle: 'popover',
      // });
    }
  }
}
