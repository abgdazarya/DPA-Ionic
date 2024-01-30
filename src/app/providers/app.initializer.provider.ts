import { APP_INITIALIZER, Injectable, OnInit, Provider } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
class AppInitializer implements Resolve<any> {
  private readonly userSubject: BehaviorSubject<any | null> =
    new BehaviorSubject<any | null>(null);
  public user$: Observable<any | null>;

  constructor() {
    this.user$ = this.userSubject.asObservable();
  }

  handleFetchUser(): void {}

  resolve() {
    return () => {
      return this.handleFetchUser();
    };
  }
}

export const AppInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: (initializer: AppInitializer) => {
    return initializer.resolve();
  },
  deps: [AppInitializer],
  multi: true,
};
