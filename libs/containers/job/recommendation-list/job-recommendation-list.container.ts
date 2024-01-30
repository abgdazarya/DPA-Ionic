import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetListJob, JobModel } from '@controllers/menu-job';
import { Store } from '@ngrx/store';
import { Pagination } from '@shared';
import {
  MenuJobInteractionRepository,
  MenuJobRepository,
  MenuJobState,
} from '@stores/menu-job';
import { ProfileRepository } from '@stores/profile';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-job-recommendation-list-container',
  templateUrl: './job-recommendation-list.container.html',
  providers: [
    ProfileRepository,
    MenuJobRepository,
    MenuJobInteractionRepository,
  ],
})
export class RecommendationListContainer
  implements OnInit, OnDestroy, OnChanges
{
  @Input() keyword: string = '';

  public job$: Observable<JobModel[] | undefined | null>;
  public loading$: Observable<boolean | undefined | null>;

  public pagination$: Observable<Pagination | undefined | null>;
  private paramsEventListener: any = null;
  public idJob: any = '';

  constructor(
    private storageService: StorageService,
    public store: Store<MenuJobState>,
    public profileRepo: ProfileRepository,
    public menuJobRepo: MenuJobRepository,
    public menuJobInteractionRepo: MenuJobInteractionRepository,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.job$ = this.menuJobRepo.getJobRecommendation$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.data.length) return null;
        return res?.data?.data;
      })
    );

    this.pagination$ = this.menuJobRepo.getJobRecommendation$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data?.pagination) return null;
        return res?.data?.pagination;
      })
    );

    this.loading$ = this.menuJobInteractionRepo
      .getJobRecommendationInteraction$()
      .pipe(
        map((res) => {
          return res.isLoading;
        })
      );
    this.paramsEventListener = this.activeRoute.params.subscribe((params) => {
      this.idJob = params['idJob'];
    });
  }

  public handlePageChange(page: number): void {
    this.fetchListJob(page);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  public async fetchListJob(page: number = 1) {
    const noPeserta = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    const payload = {
      ...noPeserta,
      limit: 10,
      keyword: this.keyword,
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

  public handleNavigateToJobDetail(job: JobModel): void {
    this.router.navigate([`/job/${job.idJob}`]).then();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchListJob();
  }

  ngOnInit(): void {
    this.fetchListJob();
  }

  ngOnDestroy(): void {
    this.paramsEventListener.unsubscribe();
  }
}
