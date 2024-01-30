import { HostListener, Injectable } from '@angular/core';
import { isPlatform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  constructor() {}

  public isMobileNativeResolution(): boolean {
    return window.innerWidth < 992;
  }

  public isDesktopNativeResolution(): boolean {
    return window.innerWidth >= 992;
  }

  public isMobileResolution(): boolean {
    return window.innerWidth < 992;
  }
  // public isTabletResolution(): boolean {
  //   return window.innerWidth < 992;
  // }

  public isDesktopResolution(): boolean {
    return window.innerWidth >= 992;
  }

  public isMobileBrowser(): boolean {
    return window.innerWidth < 992 && isPlatform('mobileweb');
  }
}
