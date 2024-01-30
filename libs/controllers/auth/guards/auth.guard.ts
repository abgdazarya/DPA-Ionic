import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ProfileRepository } from '@stores/profile';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { from, lastValueFrom, map, of, take } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private profileRepo: ProfileRepository,
    private storageService: StorageService,
    private router: Router
  ) {}

  async canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    let accessable = false;
    const data = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    accessable = data ? true : false;
    if (!accessable) {
      this.router.navigateByUrl('/home');
    }
    return accessable;
  }
}
