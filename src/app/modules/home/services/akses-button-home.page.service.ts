import { Injectable } from '@angular/core';
import { AksesMenuModel, GetAksesMenu } from '@controllers/home';
import { Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import {
  HomeInteractionRepository,
  HomeRepository,
  HomeState,
} from '@stores/home';
import { AksesMenuButtonEnum } from 'libs/controllers/home/enums/akses-menu-button.enum';
import { MenuService } from 'libs/controllers/menu/services/menu.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';

@Injectable()
export class AksesButtonHomePageService {
  private readonly accessRuangPensiunSubject: BehaviorSubject<
    boolean | undefined | null
  > = new BehaviorSubject<boolean | undefined | null>(null);
  public accessRuangPensiunButton$: Observable<boolean | undefined | null> =
    this.accessRuangPensiunSubject.asObservable();

  private readonly accessAstraHubSubject: BehaviorSubject<
    boolean | undefined | null
  > = new BehaviorSubject<boolean | undefined | null>(null);
  public accessAstraHubButton$: Observable<boolean | undefined | null> =
    this.accessAstraHubSubject.asObservable();

  private readonly accessLowonganSubject: BehaviorSubject<
    boolean | undefined | null
  > = new BehaviorSubject<boolean | undefined | null>(null);
  public accessLowonganButton$: Observable<boolean | undefined | null> =
    this.accessLowonganSubject.asObservable();

  private readonly accessLaporanInvestasiSubject: BehaviorSubject<
    boolean | undefined | null
  > = new BehaviorSubject<boolean | undefined | null>(null);
  public accessLaporanInvestasiButton$: Observable<boolean | undefined | null> =
    this.accessLaporanInvestasiSubject.asObservable();

  private readonly accessSimulasiMpSubject: BehaviorSubject<
    boolean | undefined | null
  > = new BehaviorSubject<boolean | undefined | null>(null);
  public accessSimulasiMpButton$: Observable<boolean | undefined | null> =
    this.accessSimulasiMpSubject.asObservable();

  private readonly accessEklaimSubject: BehaviorSubject<
    boolean | undefined | null
  > = new BehaviorSubject<boolean | undefined | null>(null);
  public accessEklaimButton$: Observable<boolean | undefined | null> =
    this.accessEklaimSubject.asObservable();

  private readonly accessQuizSubject: BehaviorSubject<
    boolean | undefined | null
  > = new BehaviorSubject<boolean | undefined | null>(null);
  public accessQuizButton$: Observable<boolean | undefined | null> =
    this.accessQuizSubject.asObservable();

  private readonly accessBacaSubject: BehaviorSubject<
    boolean | undefined | null
  > = new BehaviorSubject<boolean | undefined | null>(null);
  public accessBacaButton$: Observable<boolean | undefined | null> =
    this.accessBacaSubject.asObservable();

  private readonly accessPromosiSubject: BehaviorSubject<
    boolean | undefined | null
  > = new BehaviorSubject<boolean | undefined | null>(null);
  public accessPromosiButton$: Observable<boolean | undefined | null> =
    this.accessPromosiSubject.asObservable();

  private readonly accessSaldoSubject: BehaviorSubject<
    boolean | undefined | null
  > = new BehaviorSubject<boolean | undefined | null>(null);
  public accessSaldoButton$: Observable<boolean | undefined | null> =
    this.accessSaldoSubject.asObservable();

  public aksesMenuInteraction$: Observable<InteractionState | undefined | null>;
  public aksesMenuRes$: Observable<AksesMenuModel | undefined | null>;

  constructor(
    private store: Store<HomeState>,
    private storageService: StorageService,
    private menuService: MenuService,
    private repo: HomeRepository,
    private interactionRepo: HomeInteractionRepository
  ) {
    this.aksesMenuInteraction$ =
      this.interactionRepo.getAksesMenuInteraction$();
    this.aksesMenuRes$ = this.repo.getAksesMenu$().pipe(
      filter((res) => !!res),
      map((res) => res?.data)
    );
  }

  public handleFetchAksesMenu(): void {
    const idProfilDpa = this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    if (idProfilDpa) {
      const noPeserta = this.storageService.getStorage(
        StorageKeyEnum.NOMOR_PESERTA
      );

      this.store.dispatch(
        GetAksesMenu({
          payload: {
            statusPeserta: noPeserta?.statusPeserta || 'UMUM',
          },
        })
      );

      return;
    }

    this.store.dispatch(
      GetAksesMenu({ payload: { statusPeserta: 'NOT-LOGIN' } })
    );
  }

  public handleFetchAksesSaldo(): void {
    const noPeserta = this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );

    if (noPeserta) {
      this.menuService
        .getSaldoAccess({ idAccountDpa: noPeserta.idAccount })
        .subscribe(
          (res) => {
            this.accessSaldoSubject.next(true);
          },
          (err) => {
            this.accessSaldoSubject.next(false);
          }
        );

      return;
    }
  }

  public handleSetAksesMenuButton(key: any): void {
    switch (key) {
      case AksesMenuButtonEnum.RUANG_PENSIUN.toString():
        this.accessRuangPensiunSubject.next(true);
        break;

      case AksesMenuButtonEnum.ASTRAHUB.toString():
        this.accessAstraHubSubject.next(true);
        break;

      case AksesMenuButtonEnum.EKLAIM.toString():
        this.accessEklaimSubject.next(true);
        break;

      case AksesMenuButtonEnum.LAPORAN_INVESTASI.toString():
        this.accessLaporanInvestasiSubject.next(true);
        break;

      case AksesMenuButtonEnum.SIMULASI_MANFAAT_PENSIUN.toString():
        this.accessSimulasiMpSubject.next(true);
        break;

      case AksesMenuButtonEnum.BACA.toString():
        this.accessBacaSubject.next(true);
        break;

      case AksesMenuButtonEnum.QUIZ.toString():
        this.accessQuizSubject.next(true);
        break;

      case AksesMenuButtonEnum.PROMOSI.toString():
        this.accessPromosiSubject.next(true);
        break;

      case AksesMenuButtonEnum.JOBS.toString():
        this.accessLowonganSubject.next(true);
        break;

      default:
        break;
    }
  }

  public handleResetAccessMenu(): void {
    this.accessRuangPensiunSubject.next(false);
    this.accessAstraHubSubject.next(false);
    this.accessEklaimSubject.next(false);
    this.accessLaporanInvestasiSubject.next(false);
    this.accessSimulasiMpSubject.next(false);
    this.accessBacaSubject.next(false);
    this.accessQuizSubject.next(false);
    this.accessPromosiSubject.next(false);
    this.accessLowonganSubject.next(false);
    this.accessSaldoSubject.next(false);
  }
}
