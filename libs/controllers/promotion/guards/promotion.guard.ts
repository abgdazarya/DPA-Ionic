import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { map, of } from 'rxjs';

@Injectable()
export class PromotionGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

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
      this.router.navigateByUrl('/login');
    }
    return accessable;
  }
}
