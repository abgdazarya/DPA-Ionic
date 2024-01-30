import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseProfile, GetLink, LinkData, UserInfo } from '@controllers/profile';
import { Store } from '@ngrx/store';
import {
  DataResponse,
  DataResponsePagination,
  InteractionState,
} from '@shared';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { NavigationService } from 'libs/services/common/navigation.service';
import { ProfileState } from 'libs/stores/profile/states/profile.state';
import { Observable, map } from 'rxjs';

import { MenuInteractionRepository, MenuRepository } from '@stores/menu';
import {
  MenuNewsInteractionRepository,
  MenuNewsRepository,
} from '@stores/menu-news';

import { DpaTv, News } from '@controllers/menu';
import { MenuNewsState } from '@stores/menu-news';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import {
  GetListNews,
  GetPublicListNews,
  NewsModel,
} from '@controllers/menu-news';
import {
  MenuDpaTvInteractionRepository,
  MenuDpaTvRepository,
  MenuDpaTvState,
} from '@stores/menu-dpa-tv';
import {
  DpaTvModel,
  GetListDpaTv,
  GetPublicListDpaTv,
} from '@controllers/menu-dpa-tv';
import { Browser } from '@capacitor/browser';
import { Location, PlatformLocation } from '@angular/common';

@Component({
  selector: 'common-footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['footer.component.scss'],
  providers: [
    MenuInteractionRepository,
    MenuRepository,
    ProfileRepository,
    ProfileInteractionRepository,
    MenuNewsInteractionRepository,
    MenuNewsRepository,
    MenuDpaTvInteractionRepository,
    MenuDpaTvRepository,
  ],
})
export class FooterComponent implements OnInit {
  public response$: Observable<DataResponse<LinkData> | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;
  appleStoreUrl: string | null | undefined = '';
  playStoreUrl: string | null | undefined = '';
  dataEmailCS: any = {};
  dataCS: any = {};

  public news$: Observable<NewsModel[] | undefined | null>;
  public newsLoading$: Observable<boolean | undefined | null>;
  public profile$: Observable<BaseProfile | undefined | null>;

  public dpaTv$: Observable<DpaTvModel[] | undefined | null>;
  public dpaTvLoading$: Observable<boolean | undefined | null>;

  constructor(
    private store: Store<ProfileState>,
    private menuNewsStore: Store<MenuNewsState>,
    private menuDpaTvStore: Store<MenuDpaTvState>,
    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    private menuRepo: MenuRepository,
    private menuInteractionRepo: MenuInteractionRepository,
    private menuNewsRepo: MenuNewsRepository,
    private menuNewsInteractionRepo: MenuNewsInteractionRepository,
    private menuDpaTvRepo: MenuDpaTvRepository,
    private menuDpaTvInteractionRepo: MenuDpaTvInteractionRepository,
    private navigationService: NavigationService,
    private storageService: StorageService,
    private location: Location,
    private router: Router
  ) {
    this.profile$ = this.profileRepository.getUserInfoData$();
    this.response$ = this.profileRepository.getLink$();
    this.interactionResponse$ =
      this.profileInteractionRepository.getLinkInteraction$();

    this.news$ = this.menuNewsRepo.getNewsFooter$().pipe(
      map((res) => {
        if (!res?.data?.data?.length) return;
        return res?.data?.data;
      })
    );

    this.newsLoading$ = this.menuDpaTvInteractionRepo
      .getDpaTvFooterInteraction$()
      .pipe(map((res) => res.isLoading));

    this.dpaTv$ = this.menuDpaTvRepo.getDpaTvFooter$().pipe(
      map((res) => {
        if (!res?.data?.data?.length) return;
        return res?.data?.data;
      })
    );

    this.dpaTvLoading$ = this.menuDpaTvInteractionRepo
      .getDpaTvFooterInteraction$()
      .pipe(map((res) => res.isLoading));
  }

  public handleNavigateUrl(url: string): void {
    if (url == 'quiz') {
      this.router
        .navigate([url], { onSameUrlNavigation: 'reload', replaceUrl: true })
        .then(() => {
          this.location.replaceState(url);
        });
    } else {
      this.router.navigateByUrl(url);
    }
  }

  public async handleNavigateToYoutube(dpaTv: DpaTvModel) {
    if (!dpaTv.linkYoutube) return;
    await Browser.open({
      url: dpaTv.linkYoutube,
      presentationStyle: 'popover',
    });
  }

  handleDetailNewsClicked(news: News): void {
    this.router.navigate([`news/${news.idBeritaDpa}`]);
  }

  ngOnInit(): void {
    this.fetchDataEmailCs();
    this.fetchDataPhoneCs();
    this.fetchPlayStoreLink();
    this.fetchAppStoreLink();
    this.fetchListMetaData();
    this.fetchProfile();
  }

  showQuiz: boolean = false;
  async fetchProfile() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const payload = {};
    if (!idProfilDpa) return;
    this.store.dispatch(UserInfo({ payload }));

    this.profile$.subscribe((res) => {
      if (res) {
        this.showQuiz = true;
      } else {
        this.showQuiz = false;
      }
    });
  }

  public async fetchListMetaData() {
    const noPeserta = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    const payload = {
      ...noPeserta,
      keyword: '',
      page: 1,
      limit: 4,
    };

    if (noPeserta) {
      this.menuNewsStore.dispatch(
        GetListNews({
          payload,
          dataType: 'footer',
        })
      );

      this.menuDpaTvStore.dispatch(
        GetListDpaTv({
          payload,
          dataType: 'footer',
        })
      );

      return;
    }

    this.menuNewsStore.dispatch(
      GetPublicListNews({
        payload,
        dataType: 'footer',
      })
    );

    this.menuDpaTvStore.dispatch(
      GetPublicListDpaTv({
        payload,
        dataType: 'footer',
      })
    );
  }

  fetchDataInstagram() {
    const payload = { condition: 'LINK_INSTAGRAM' };
    this.store.dispatch(GetLink({ payload }));
    this.response$.subscribe((res) => {
      if (res?.data?.condition === 'LINK_INSTAGRAM')
        this.dataEmailCS = res?.data;
    });
  }

  fetchDataEmailCs() {
    const payload = { condition: 'LINK_CS_EMAIL' };
    this.store.dispatch(GetLink({ payload }));
    this.response$.subscribe((res) => {
      if (res?.data?.condition === 'LINK_CS_EMAIL')
        this.dataEmailCS = res?.data;
    });
  }

  fetchDataPhoneCs() {
    const payload = { condition: 'LINK_CS_TELEPON' };
    this.store.dispatch(GetLink({ payload }));
    this.response$.subscribe((res) => {
      if (res?.data?.condition === 'LINK_CS_TELEPON') this.dataCS = res?.data;
    });
  }

  fetchPlayStoreLink() {
    const payload = { condition: 'LINK_APP_PLAYSTORE' };
    this.store.dispatch(GetLink({ payload }));
    this.response$.subscribe((res) => {
      if (res?.data?.condition === 'LINK_APP_PLAYSTORE')
        this.playStoreUrl = res?.data?.description;
    });
  }

  fetchAppStoreLink() {
    const payload = { condition: 'LINK_APP_APPSTORE' };
    this.store.dispatch(GetLink({ payload }));
    this.response$.subscribe((res) => {
      if (res?.data?.condition === 'LINK_APP_APPSTORE')
        this.appleStoreUrl = res?.data?.description;
    });
  }

  openAppUrl(type: string = 'playStore') {
    if (type === 'playStore')
      this.navigationService.openUrl(this.playStoreUrl!);
    else this.navigationService.openUrl(this.appleStoreUrl!);
  }
}
