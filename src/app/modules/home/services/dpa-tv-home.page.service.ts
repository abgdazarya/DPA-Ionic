import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import {
  DpaTvModel,
  GetListDpaTv,
  GetPublicListDpaTv,
} from '@controllers/menu-dpa-tv';
import { Store } from '@ngrx/store';
import { MenuDpaTvState } from '@stores/menu-dpa-tv';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';

@Injectable()
export class DpaTvHomePageService {
  constructor(
    private store: Store<MenuDpaTvState>,
    private storageService: StorageService,
    private router: Router
  ) {}

  public handleFetchDpaTvLanding(): void {
    const noPeserta = this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );

    const payload = {
      ...noPeserta,
      keyword: '',
      page: 1,
      limit: 5,
    };

    if (noPeserta) {
      this.store.dispatch(
        GetListDpaTv({
          payload,
          dataType: 'landing',
        })
      );

      return;
    }

    this.store.dispatch(
      GetPublicListDpaTv({
        payload,
        dataType: 'landing',
      })
    );
  }

  public handleNavigateToDpaTv(): void {
    this.router.navigate(['dpatv']).then();
  }

  public async handleNavigateToYoutube(dpaTv: DpaTvModel) {
    if (!dpaTv.linkYoutube) return;
    await Browser.open({
      url: dpaTv.linkYoutube,
      presentationStyle: 'popover',
    });
  }
}
