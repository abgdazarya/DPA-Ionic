import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, ComponentType } from '@components/common';
import { Store } from '@ngrx/store';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import {
  GetDetailNews,
  GetListNews,
  GetPublicListNews,
  NewsModel,
  SetReadNews,
} from '@controllers/menu-news';
import {
  MenuNewsInteractionRepository,
  MenuNewsRepository,
  MenuNewsState,
} from '@stores/menu-news';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable, Subscription, filter, first, take, tap } from 'rxjs';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { DataResponse, InteractionState, InteractionType } from '@shared';

@Component({
  selector: 'app-news-detail-page',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthRepository,
    AuthInteractionRepository,
    MenuNewsRepository,
    MenuNewsInteractionRepository,
  ],
})
export class DetailPage implements OnInit, OnDestroy {
  public subs = new Subscription();
  public type: typeof ComponentType = ComponentType;
  public news$: Observable<DataResponse<NewsModel> | undefined | null>;
  public interaction$: Observable<InteractionState>;

  public breadcrumbs: Breadcrumb[] = [
    { label: 'Home', link: '/home' },
    { label: 'Baca', link: '/news/index' },
    { label: 'Detail Berita', link: '' },
  ];

  @HostListener('window:resize')
  public onResize() {
    this.getComponentType();
    this.handleChangeTemplateService();
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
    private store: Store<MenuNewsState>,
    private storageService: StorageService,
    private newsRepo: MenuNewsRepository,
    private newsInteractionRepo: MenuNewsInteractionRepository,
    private router: Router,
    public screenSizeService: ScreenSizeService,
    private route: ActivatedRoute,
    private location: Location,
    public templateService: AppMainTemplateService,
    private cdr: ChangeDetectorRef
  ) {
    this.news$ = this.newsRepo.getNewsDetail$();
    this.interaction$ = this.newsInteractionRepo.getNewsDetailInteraction$();

    // this.detailBrita$.subscribe((e) => {
    //   if (e?.code == '00' && e.data) {

    //     if (e.data?.flagRead !== 1) {
    //     }
    //   }
    // });
  }

  handleDetailNewsClicked(news: NewsModel): void {
    this.router.navigate([`news/${news.idBeritaDpa}`], {
      queryParamsHandling: 'merge',
    });
  }

  public handleSelectBreadcrumb(link: string): void {
    if (!link) return;
    this.router.navigateByUrl(link);
  }

  public handleSetRead() {
    const action = this.news$
      .pipe(
        take(1),
        tap((res) => {
          const news = res?.data;

          const idProfilDpa = this.storageService.getStorage(
            StorageKeyEnum.ID_PROFILE_DPA
          );
          if (!idProfilDpa) return;

          const { idBeritaDpa } = this.route.snapshot.params;

          const payload = {
            idBeritaDpa,
            // idProfilDpa,
            headlineBerita: news?.headlineBerita,
          };

          this.store.dispatch(SetReadNews({ payload }));
        })
      )
      .subscribe();

    this.subs.add(action);
  }

  public handleInteraction() {
    const action = this.interaction$
      .pipe(
        filter((res) => !!res),
        tap((res) => {
          if (res?.type === InteractionType.SUCCEED) {
            this.handleSetRead();
          }
        })
      )
      .subscribe();

    this.subs.add(action);
  }

  // public fetchListNews() {
  //   console.log('fetchListNews ');

  //   const noPeserta = this.storageService.getStorage(
  //     StorageKeyEnum.NOMOR_PESERTA
  //   );
  //   const payload = {
  //     ...noPeserta,
  //     keyword: '',
  //     page: 1,
  //     limit: 3,
  //   };

  //   if (noPeserta) {
  //     this.store.dispatch(GetListNews({ payload, dataType: 'latest' }));

  //     return;
  //   }

  //   this.store.dispatch(GetPublicListNews({ payload, dataType: 'latest' }));
  // }

  handleChangeTemplateService() {
    this.templateService.handleInit();
    this.templateService.handleShowFooter(true);
    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeIonContentClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'ion-background-white-blur relative'
        : 'relative'
    );
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none'
        : 'bg-bg-0 h-[78px]'
    );
    this.templateService.handleChangePageTitle('Detail Berita');
    this.templateService.handleUseSecondaryHeader(true);
    this.templateService.handleOnBack(() => {
      this.router
        .navigate(['/news/index'], { onSameUrlNavigation: 'reload' })
        .then(() => {
          this.location.replaceState('/news/index');
        });
    });
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.handleChangeTemplateService();

      const el: any = document.querySelector('.page-container-main');

      if (el) {
        el.scrollToTop?.();
      }
    }, 0);

    // this.handleSetRead();
    // this.fetchListNews();

    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth',
    // });

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    const { idBeritaDpa } = this.route.snapshot.params;

    if (!idBeritaDpa) return;
    const payload = {
      idBeritaDpa,
    };
    this.store.dispatch(GetDetailNews({ payload }));

    this.handleInteraction();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
