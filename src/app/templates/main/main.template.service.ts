import { HostListener, Injectable } from '@angular/core';
import { isPlatform } from '@ionic/angular';
import { DeviceService } from 'libs/services/devices/device.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppMainTemplateService {
  // Class Service
  private readonly ionHeaderClassSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  public ionHeaderClass$: Observable<string>;

  private readonly footerClassSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  public footerClass$: Observable<string>;

  private readonly ionContentClassSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  public ionContentClass$: Observable<string>;

  private readonly headerContainerClassSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  public headerContainerClass$: Observable<string>;

  private readonly secondaryHeaderClassSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  public secondaryHeaderClass$: Observable<string>;

  private readonly pageTitleSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  public pageTitle$: Observable<string>;

  // Component Service
  private readonly headerShowSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  public headerShow$: Observable<boolean>;

  private readonly footerShowSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  public footerShow$: Observable<boolean>;

  private readonly iconQuizShowSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public iconQuizShow$: Observable<boolean>;

  private readonly iconFloatinghowSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  public floatingShow$: Observable<boolean>;

  private readonly notificationShowSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public notificationShow$: Observable<boolean>;

  private readonly profileShowSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public profileShow$: Observable<boolean>;

  private readonly useSecondaryHeaderSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private readonly onBackSubject: BehaviorSubject<(() => void) | any> =
    new BehaviorSubject<(() => void) | any>(undefined);
  public onBack$: Observable<(() => void) | any>;

  private readonly rightBtnClickSubject: BehaviorSubject<(() => void) | any> =
    new BehaviorSubject<(() => void) | any>(undefined);
  public rightBtnClick$: Observable<(() => void) | any>;

  private rightIconSubject: BehaviorSubject<String> =
    new BehaviorSubject<String>('');

  public rightIcon$: Observable<String>;

  private rightLabelSubject: BehaviorSubject<String> =
    new BehaviorSubject<String>('');

  public rightLabel$: Observable<String>;

  public useSecondaryHeader$: Observable<boolean>;

  private readonly floatingButtonSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public floatingButton$: Observable<boolean>;

  // private readonly showReadNotifButtonSubject: BehaviorSubject<boolean> =
  //   new BehaviorSubject<boolean>(true);

  // public showReadNotifButton$: Observable<boolean>;

  @HostListener('window:resize')
  public onResize() {
    // this.getComponentType();
  }

  constructor(private deviceService: DeviceService) {
    this.ionHeaderClass$ = this.ionHeaderClassSubject.asObservable();
    this.footerClass$ = this.footerClassSubject.asObservable();

    this.headerContainerClass$ =
      this.headerContainerClassSubject.asObservable();
    this.secondaryHeaderClass$ =
      this.secondaryHeaderClassSubject.asObservable();
    this.ionContentClass$ = this.ionContentClassSubject.asObservable();
    this.pageTitle$ = this.pageTitleSubject.asObservable();
    this.headerShow$ = this.headerShowSubject.asObservable();
    this.footerShow$ = this.footerShowSubject.asObservable();
    this.iconQuizShow$ = this.iconQuizShowSubject.asObservable();
    this.floatingShow$ = this.iconFloatinghowSubject.asObservable();
    this.notificationShow$ = this.notificationShowSubject.asObservable();
    this.profileShow$ = this.profileShowSubject.asObservable();
    this.useSecondaryHeader$ = this.useSecondaryHeaderSubject.asObservable();
    this.onBack$ = this.onBackSubject.asObservable();
    this.rightBtnClick$ = this.rightBtnClickSubject.asObservable();
    this.rightIcon$ = this.rightIconSubject.asObservable();
    this.rightLabel$ = this.rightLabelSubject.asObservable();
    this.floatingButton$ = this.floatingButtonSubject.asObservable();
    // this.showReadNotifButton$ = this.showReadNotifButtonSubject.asObservable();
  }

  public handleInit(): void {
    this.ionHeaderClassSubject.next('');
    this.footerClassSubject.next(
      isPlatform('capacitor') ? 'hidden md:hidden' : ''
    );

    this.headerContainerClassSubject.next('');
    this.secondaryHeaderClassSubject.next('');
    this.ionContentClassSubject.next('');
    this.pageTitleSubject.next('');
    this.useSecondaryHeaderSubject.next(false);
    this.headerShowSubject.next(true);
    this.footerShowSubject.next(isPlatform('capacitor') ? false : true);
    this.iconQuizShowSubject.next(false);
    this.iconFloatinghowSubject.next(true);
    this.notificationShowSubject.next(false);
    this.profileShowSubject.next(false);
    this.floatingButtonSubject.next(true);
    this.onBackSubject.next(undefined);
    this.rightBtnClickSubject.next(undefined);
    this.rightBtnClickSubject.next(null);
    this.rightIconSubject.next('');
    this.rightLabelSubject.next('');
  }

  // public handleChangehowReadNotif(showReadNotifButton: string): void {
  //   this.showReadNotifButtonSubject.next(showReadNotifButton);
  // }

  public handleChangeIonHeaderClass(ionHeaderClass: string): void {
    this.ionHeaderClassSubject.next(ionHeaderClass);
  }

  public handleChangeFooterClass(footerClass: string): void {
    this.footerClassSubject.next(footerClass);
  }

  public handleChangeHeaderContainerClass(headerContainerClass: string): void {
    this.headerContainerClassSubject.next(headerContainerClass);
  }

  public handleChangeSecondaryHeaderClass(secondaryHeaderClass: string): void {
    this.secondaryHeaderClassSubject.next(secondaryHeaderClass);
  }

  public handleChangeIonContentClass(ionContentClass: string): void {
    this.ionContentClassSubject.next(ionContentClass);
  }

  public handleChangePageTitle(pageTitle: string): void {
    this.pageTitleSubject.next(pageTitle);
  }

  public handleUseSecondaryHeader(isUse: boolean): void {
    this.useSecondaryHeaderSubject.next(isUse);
  }

  public handleShowHeader(isShow: boolean): void {
    this.headerShowSubject.next(isShow);
  }

  public handleShowFooter(isShow: boolean): void {
    this.footerShowSubject.next(isShow);
  }

  public handleShowIconQuiz(isShow: boolean): void {
    this.iconQuizShowSubject.next(isShow);
  }

  public handleShowIconFloating(isShow: boolean): void {
    this.iconFloatinghowSubject.next(isShow);
  }

  public handleShowNotification(isShow: boolean): void {
    this.notificationShowSubject.next(isShow);
  }

  public handleShowProfile(isShow: boolean): void {
    this.profileShowSubject.next(isShow);
  }

  public handleOnBack(event: (() => void) | any): void {
    this.onBackSubject.next(event);
  }

  public handleRightBtnClick(
    event: (() => void) | any,
    icon?: string,
    rightLabel?: string
  ): void {
    this.rightBtnClickSubject.next(event);
    if (icon) {
      this.rightIconSubject.next(icon);
    } else if (!icon) {
      this.rightIconSubject.next('');
    }
    if (rightLabel) {
      this.rightLabelSubject.next(rightLabel);
    } else if (!rightLabel) {
      this.rightLabelSubject.next('');
    }
  }
  public handleShowFloatingButton(isShow: boolean): void {
    this.floatingButtonSubject.next(isShow);
  }

  public handleShowConsole(): void {}
}
