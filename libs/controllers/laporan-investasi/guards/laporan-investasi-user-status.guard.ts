import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { StatusPesertaEnum } from '@controllers/auth';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { map, of } from 'rxjs';

@Injectable()
export class LaporanInvestasiUserStatusGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  async canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const noPeserta = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    const idProfil = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    if (noPeserta?.statusPeserta === StatusPesertaEnum.ALL.toString()) {
      this.router.navigateByUrl('/not-found');
      return false;
    }

    if (noPeserta?.statusPeserta === StatusPesertaEnum.PENSIUNAN.toString()) {
      this.router.navigateByUrl('/not-found');
      return false;
    }

    if (!noPeserta) {
      this.router.navigateByUrl('/not-found');
      return false;
    }

    if (!idProfil) {
      this.router.navigateByUrl('/not-found');
      return false;
    }
    return true;
  }
}
