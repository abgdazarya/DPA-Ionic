import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppComponentService {
  private readonly showOcrKtpSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public showOcrKtp$: Observable<boolean>;

  private readonly showLoadingPendingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public showLoadingPending$: Observable<boolean>;

  private readonly showLoadingAuthSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public showLoadingAuth$: Observable<boolean>;

  private readonly backFunctionSubject: BehaviorSubject<(() => void) | any> =
    new BehaviorSubject<(() => void) | any>(undefined);
  public backFunction$: Observable<(() => void) | any>;

  constructor() {
    this.showOcrKtp$ = this.showOcrKtpSubject.asObservable();
    this.showLoadingPending$ = this.showLoadingPendingSubject.asObservable();
    this.showLoadingAuth$ = this.showLoadingAuthSubject.asObservable();
    this.backFunction$ = this.backFunctionSubject.asObservable();
  }

  public handleBackFunction(event: (() => void) | any): void {
    this.backFunctionSubject.next(event);
  }

  public handleInit(): void {
    this.showOcrKtpSubject.next(false);
  }

  public handleShowOcrKtp(isShow: boolean): void {
    this.showOcrKtpSubject.next(isShow);
  }

  public handleShowLoadingPending(isShow: boolean, from?: string): void {
    this.showLoadingPendingSubject.next(isShow);
  }

  public handleShowLoadingAuth(isShow: boolean, from?: string): void {
    this.showLoadingPendingSubject.next(isShow);
  }
}
