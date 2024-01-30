import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoginPageService {
  private readonly isOtpModalShowSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isOtpModalShow$: Observable<boolean> =
    this.isOtpModalShowSubject.asObservable();

  private readonly isReferralCodeModalShowSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isReferralCodeModalShow$: Observable<boolean> =
    this.isReferralCodeModalShowSubject.asObservable();

  private readonly isPinModalShowSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isPinModalShow$: Observable<boolean> =
    this.isPinModalShowSubject.asObservable();

  private readonly isUserNumberModalShowSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isUserNumberModalShow$: Observable<boolean> =
    this.isUserNumberModalShowSubject.asObservable();

  constructor() {}

  public get isWebBase(): boolean {
    return Capacitor.getPlatform() === 'web';
  }

  public handleShowOtpModal(show: boolean): void {
    this.isOtpModalShowSubject.next(show);
  }

  public handleShowReferralCodeModal(show: boolean): void {
    this.isReferralCodeModalShowSubject.next(show);
  }

  public handleShowPinModal(show: boolean): void {
    this.isPinModalShowSubject.next(show);
  }

  public handleShowUserNumberModal(show: boolean): void {
    this.isUserNumberModalShowSubject.next(show);
  }
}
