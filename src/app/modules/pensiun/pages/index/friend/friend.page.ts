import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
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
import { PageType, PensiunPageService } from '../../pensiun-page.service';
import { NoPesertaData, StatusPesertaEnum } from '@controllers/auth';
import { CustomPopupComponent } from 'libs/components/common/custom-popup/custom-popup.component';
import { AjakPesertaModal } from 'libs/components/ruang-pensiun/modals/ajak-peserta/ajak-peserta.modal';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { GetLink, LinkData } from '@controllers/profile';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
@Component({
  selector: 'app-pensiun-index-friend-page',
  templateUrl: 'friend.page.html',
  styleUrls: ['friend.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthRepository,
    AuthInteractionRepository,
    MenuRepository,
    MenuInteractionRepository,
  ],
})
export class IndexFriendPage implements OnInit, OnDestroy {
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

  public loading$: Observable<boolean | undefined | null>;

  public friendList$: Observable<FriendList[] | undefined | null>;
  public interaction$: Observable<InteractionState | undefined | null>;
  public response$: Observable<DataResponse<LinkData> | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;

  public noPeserta$: Observable<NoPesertaData | undefined | null> = of(null);
  isLoading: boolean = true;
  @Input() keyword: string = '';

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private router: Router,
    private menuRepository: MenuRepository,
    public screenSizeService: ScreenSizeService,
    private menuInteractionRepository: MenuInteractionRepository,
    public storageService: StorageService,
    public pageService: PensiunPageService,
    private toast: ToastController,
    public cdr: ChangeDetectorRef,
    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    public templateService: AppMainTemplateService
  ) {
    this.loading$ = this.menuInteractionRepository
      .getFriendList$()
      .pipe(map((res) => res.isLoading));

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
  isLoggedIn: boolean = false;
  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.fetchDataWaBisnisDPA();
    this.pageService.handleChangePage('friend');
    this.templateService.handleChangePageTitle('Ruang Pensiun');

    const nomorPeserta = this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );

    if (nomorPeserta.statusPeserta == StatusPesertaEnum.PENSIUNAN) {
      this.isPensiunan = true;
    } else {
      this.isPensiunan = false;
    }

    const idProfilDpa = this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    this.isLoggedIn = idProfilDpa ? true : false;

    this.fetchFriendList();

    this.pageService.keyword$.subscribe((res) => {
      this.keyword = res;
      this.resetData();
      this.fetchFriendList();
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
    this.subscribtionsWaDPA.unsubscribe();
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
          this.cdr.markForCheck();

          let payload = {
            ...noPeserta,
            search: this.keyword || '',
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

  fetchDataWaBisnisDPA() {
    const payload = { condition: 'LINK_WHATSAPP' };
    this.store.dispatch(GetLink({ payload }));
    this.subscribtionsWaDPA = this.response$.subscribe((res) => {
      if (res?.data?.condition === 'LINK_WHATSAPP')
        this.dataWaBisnis = res?.data;
    });
  }

  resetData = () => {
    this.store.dispatch(
      GetFriendListReset({ response: DATA_RESPONSE_INITIAL_STATE })
    );
  };

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
      const data = modalData.data;

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

  public decryptUser(content: any): any {
    if (content == false || !content) return null;
    return decryptContent(content);
  }

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
