import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import {
  GetListJob,
  GetListJobReset,
  GetPublicListJob,
  JobModel,
} from '@controllers/menu-job';
import { IonContent, Platform } from '@ionic/angular';
import { INITIAL_STATE, Store } from '@ngrx/store';
import { Pagination } from '@shared';
import {
  MenuJobInteractionRepository,
  MenuJobRepository,
  MenuJobState,
} from '@stores/menu-job';
import { ProfileRepository } from '@stores/profile';
import { LodaingDataStatus } from 'libs/containers/promotion/list/promotion-list.container';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-job-web-career-list-container',
  templateUrl: './job-web-career-list.container.html',
  providers: [
    ProfileRepository,
    MenuJobRepository,
    MenuJobInteractionRepository,
  ],
})
export class WebCareerListContainer implements OnInit, OnDestroy, OnChanges {
  @Input() keyword: string = '';
  @ViewChild('targetScrollPos') targetScrollPos: any;
  private targetPage: number = 1;

  public job$: Observable<JobModel[] | undefined | null>;
  public loading$: Observable<boolean | undefined | null>;

  public pagination$: Observable<Pagination | undefined | null>;
  private lodaingDataStatus: LodaingDataStatus = {
    isLoading: false,
    isError: false,
  };
  constructor(
    private storageService: StorageService,
    public store: Store<MenuJobState>,
    public profileRepo: ProfileRepository,
    public menuJobRepo: MenuJobRepository,
    public menuJobInteractionRepo: MenuJobInteractionRepository,
    private router: Router,
    private parent: IonContent,
    private platform: Platform,
    public screenSizeService: ScreenSizeService
  ) {
    this.job$ = this.menuJobRepo.getJobList$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.data.length) return null;
        this.lodaingDataStatus.totalPage = res?.data?.pagination?.totalPage;
        return res?.data?.data;
      })
    );

    this.pagination$ = this.menuJobRepo.getJobList$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.pagination) return null;
        return res?.data?.pagination;
      })
    );

    this.loading$ = this.menuJobInteractionRepo.getJobListInteraction$().pipe(
      map((res) => {
        this.lodaingDataStatus = {
          isLoading: res.isLoading,
          isError: res.success ? false : true,
        };
        return res.isLoading;
      })
    );
  }

  public handlePageChange(page: number): void {
    this.initPage(page);
    const el: any = document.querySelector('.page-container-main');
    if (el) {
      el.scrollToTop?.();
    }
  }

  public async fetchListJob(page: number = 1) {
    const noPeserta = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    const payload = {
      ...noPeserta,
      limit: 10,
      keyword: this.keyword,
      jobFlag: 'PORTAL-KARIR',
      page,
    };

    // if (noPeserta) {
    this.store.dispatch(
      GetListJob({
        payload,
        dataType: 'list',
      })
    );

    // return;
    // }

    // this.store.dispatch(
    //   GetPublicListJob({
    //     payload,
    //     dataType: 'list',
    //   })
    // );
  }

  public handleNavigateToJob(): void {
    this.router.navigate(['job']).then();
  }

  public async handleNavigateToACC(e: any) {
    if (!e.linkWebCareer) {
      alert('Maaf belum ada linknya');
      return;
    }
    await Browser.open({
      url: e.linkWebCareer || 'https://career.acc.co.id/',
      presentationStyle: 'popover',
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.fetchListJob();
  }

  ngOnInit(): void {
    this.initPage(1);
    this.createEventScrollListener();
  }

  initPage = (page: any = 1) => {
    this.parent.scrollToTop(0);
    this.store.dispatch(
      GetListJobReset({ response: INITIAL_STATE, dataType: 'list' })
    );
    this.fetchListJob(page);
    this.targetPage = page;
  };

  ngOnDestroy(): void {
    this.clearEventScrollListener();
  }

  private parentEventListener: any = null;

  createEventScrollListener = () => {
    if (this.screenSizeService.isDesktopNativeResolution()) return;
    this.parentEventListener = this.parent?.ionScroll.subscribe(
      this.onScrollListener
    );
  };

  clearEventScrollListener = () => {
    if (this.parentEventListener) {
      this.parentEventListener.unsubscribe();
    }
  };

  onScrollListener = async (e: any) => {
    const { currentY, scrollTop } = e?.detail;
    const { top, y } =
      this.targetScrollPos?.nativeElement?.getBoundingClientRect() || {};
    if (
      top <= this.platform.height() &&
      !this.lodaingDataStatus.isLoading &&
      this.targetPage < this.lodaingDataStatus.totalPage
    ) {
      this.targetPage = this.targetPage + 1;
      this.fetchListJob(this.targetPage);
    }
  };
}
