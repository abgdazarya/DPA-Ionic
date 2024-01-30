import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ResetAllState as ResetAllStateHome } from '@controllers/home';
import { ResetAllState as ResetAllStateMenu } from '@controllers/menu';
import { ResetAllState as ResetAllStateMagazine } from '@controllers/menu-astramagazine';
import { ResetAllState as ResetAllStateDpaTv } from '@controllers/menu-dpa-tv';
import { ResetAllState as ResetAllStateJob } from '@controllers/menu-job';
import { ResetAllState as ResetAllStateLaporanInvestasi } from '@controllers/menu-laporan-investasi';
import { ResetAllState as ResetAllStateNews } from '@controllers/menu-news';
import { ResetAllState as ResetAllStatePromotion } from '@controllers/menu-promotion';
import { ResetAllState as ResetAllStateProfile } from '@controllers/profile';
import { ResetAllState as ResetAllStateQuiz } from '@controllers/quiz';
import { Store } from '@ngrx/store';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { catchError, filter, from, map, mergeMap, of, take } from 'rxjs';
import { ResetAllState as ResetAllStateAuth } from '../action/states/reset-all-state';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private store: Store,
    private authService: AuthService,
    private storageService: StorageService,

    private router: Router,
    private route: ActivatedRoute
  ) {}

  handleResetAllState(): void {
    this.store.dispatch(ResetAllStateAuth());
    this.store.dispatch(ResetAllStateMagazine());
    this.store.dispatch(ResetAllStateDpaTv());
    this.store.dispatch(ResetAllStateHome());
    this.store.dispatch(ResetAllStateJob());
    this.store.dispatch(ResetAllStateLaporanInvestasi());
    this.store.dispatch(ResetAllStateMenu());
    this.store.dispatch(ResetAllStateNews());
    this.store.dispatch(ResetAllStateProfile());
    this.store.dispatch(ResetAllStatePromotion());
    this.store.dispatch(ResetAllStateQuiz());
  }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const path = router.data['path'];
    const accessable = router.data['accessable'];
    const callback = router.data['callback'];

    // console.log('ionic', path);
    // console.log('ionic', accessable);
    // console.log('ionic', callback);

    const token = this.storageService.getStorage(StorageKeyEnum.TOKEN);

    if (token) {
      return this.authService.refreshToken(true).pipe(
        filter((refreshToken) => !!refreshToken),
        take(1),
        map((res) => {
          this.storageService.setStorage(
            StorageKeyEnum.TOKEN,
            res?.data?.token
          );
          this.storageService.setStorage(
            StorageKeyEnum.REFRESH_TOKEN,
            res?.data?.refreshToken
          );
          this.storageService.setStorage(
            StorageKeyEnum.TIMESTAPM,
            res?.data?.timestamp
          );

          return true;
        }),
        catchError(({ error }) => {
          if (error?.code == '01') {
            return of(true);
          }

          if (error?.code == '02') {
            this.storageService.clearStorage();
            this.handleResetAllState();

            if (accessable) {
              return of(true);
            }

            this.router.navigate([callback || '/home']);

            return of(false);
          }

          if (error?.code == '03') {
            if (accessable) {
              return of(true);
            }

            this.router.navigate([callback || '/home']);

            return of(false);
          }

          return of(false);
        })
      );
    }

    if (accessable) {
      return of(true);
    }

    this.router.navigate([callback || '/home']);

    return of(false);
  }
}
