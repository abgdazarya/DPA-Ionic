import { Injectable } from '@angular/core';

import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppServiceProvider {
  private readonly isNotificationPopoverOpenSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isNotificationPopoverOpen$: Observable<boolean>;

  private readonly isProfilePopoverOpenSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isProfilePopoverOpen$: Observable<boolean>;

  private readonly tokenSubject: BehaviorSubject<string | null | undefined> =
    new BehaviorSubject<string | null | undefined>(null);
  public token$: Observable<string | null | undefined>;

  public constructor(private storageService: StorageService) {
    this.isNotificationPopoverOpen$ =
      this.isNotificationPopoverOpenSubject.asObservable();
    this.isProfilePopoverOpen$ =
      this.isProfilePopoverOpenSubject.asObservable();
    this.token$ = this.tokenSubject.asObservable();
  }

  public handleOpenNotificationPopover(open: boolean): void {
    this.isNotificationPopoverOpenSubject.next(open);
  }

  public handleOpenProfilePopover(open: boolean): void {
    this.isProfilePopoverOpenSubject.next(open);
  }

  public async handleGetToken() {
    this.tokenSubject.next(
      (await this.storageService.getStorage(StorageKeyEnum.TOKEN)) || null
    );
  }
}
