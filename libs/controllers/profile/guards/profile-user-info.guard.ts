import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { StorageService } from 'libs/services/common/storage.service';
import { catchError, filter, map, of, take } from 'rxjs';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class ProfileUserInfoGuard implements CanActivate {
  constructor(
    private profileService: ProfileService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.profileService.userInfo({}).pipe(
      filter((userInfo) => !!userInfo),
      take(1),
      map((userInfo) => {
        if (userInfo) {
          return true;
        }
        return false;
      }),
      catchError(({ error }) => {
        if (error?.code === '12') {
          this.storageService.clearStorage();
          const { callback } = this.route.snapshot.data;
          this.router.navigateByUrl(callback || '/authentication');
          return of(true);
        }

        if (error?.code === '11') {
          const { callback } = this.route.snapshot.data;
          this.router.navigateByUrl(callback || '/authentication');
          return of(true);
        }

        return of(false);
      })
    );
  }
}
