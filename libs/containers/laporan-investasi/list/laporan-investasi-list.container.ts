import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import {
  GetListLaporanInvestasi,
  GetPublicListLaporanInvestasi,
  LaporanInvestasiModel,
} from '@controllers/menu-laporan-investasi';
import { Store } from '@ngrx/store';
import { Pagination } from '@shared';
import {
  MenuLaporanInvestasiInteractionRepository,
  MenuLaporanInvestasiRepository,
  MenuLaporanInvestasiState,
} from '@stores/menu-laporan-investasi';
import { ProfileRepository } from '@stores/profile';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-laporan-investasi-list-container',
  templateUrl: './laporan-investasi-list.container.html',
  providers: [
    ProfileRepository,
    MenuLaporanInvestasiRepository,
    MenuLaporanInvestasiInteractionRepository,
  ],
})
export class LaporanInvestasiListContainer
  implements OnInit, OnDestroy, OnChanges
{
  @Input() keyword: string = '';
  @Input() type: any;

  public laporanInvestasi$: Observable<
    LaporanInvestasiModel[] | undefined | null
  >;
  public loading$: Observable<boolean | undefined | null>;

  // public pagination$: Observable<Pagination | undefined | null>;

  constructor(
    private storageService: StorageService,
    public store: Store<MenuLaporanInvestasiState>,
    public profileRepo: ProfileRepository,
    public menuLaporanInvestasiRepo: MenuLaporanInvestasiRepository,
    public menuLaporanInvestasiInteractionRepo: MenuLaporanInvestasiInteractionRepository,
    private router: Router
  ) {
    this.laporanInvestasi$ = this.menuLaporanInvestasiRepo
      .getLaporanInvestasiList$()
      .pipe(
        filter((res) => !!res),
        map((res) => {
          if (!res?.data?.length) return null;

          return res?.data;
        })
      );

    // this.pagination$ = this.menuLaporanInvestasiRepo
    //   .getLaporanInvestasiList$()
    //   .pipe(
    //     filter((res) => !!res),
    //     map((res) => {
    //       if (!res?.data?.pagination) return null;
    //       return res?.data?.pagination;
    //     })
    //   );

    this.loading$ = this.menuLaporanInvestasiInteractionRepo
      .getLaporanInvestasiListInteraction$()
      .pipe(
        map((res) => {
          return res.isLoading;
        })
      );
  }

  public handlePageChange(page: number): void {
    this.fetchListLaporanInvestasi(page);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  public async fetchListLaporanInvestasi(page: number = 1) {
    const noPeserta = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    const payload = {
      ...noPeserta,
      limit: 9,
      keyword: this.keyword,
      page,
    };

    this.store.dispatch(
      GetListLaporanInvestasi({
        payload,
        dataType: 'list',
      })
    );
  }

  public handleNavigateToLaporanInvestasi(): void {
    this.router.navigate(['investasi']).then();
  }

  public async handleNavigateToLaporanInvestasiDetail(
    laporanInvestasi: LaporanInvestasiModel
  ) {
    this.router
      .navigate([`/investasi/${laporanInvestasi.idLaporanInvestasi}`])
      .then();
  }

  public async handleDownloadLaporanInvestasiDetail(
    laporanInvestasi: LaporanInvestasiModel
  ) {
    if (laporanInvestasi.pdf) {
      await Browser.open({
        url: laporanInvestasi.pdf,
        presentationStyle: 'popover',
      });
      return;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchListLaporanInvestasi();
  }

  ngOnInit(): void {
    this.fetchListLaporanInvestasi();
  }

  ngOnDestroy(): void {}
}
