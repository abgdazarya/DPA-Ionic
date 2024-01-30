import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum PageType {
  PUBLIC = 'public',
  PERSONAL = 'personal',
}
@Injectable()
export class PensiunPageService {
  private readonly pageTypeSubject: BehaviorSubject<PageType> =
    new BehaviorSubject<PageType>(PageType.PUBLIC);

  public pageType$: Observable<PageType>;

  private readonly pageSubject: BehaviorSubject<
    'index' | 'activity' | 'category' | 'transaction' | 'friend'
  > = new BehaviorSubject<
    'index' | 'activity' | 'category' | 'transaction' | 'friend'
  >('index');

  public page$: Observable<
    'index' | 'activity' | 'category' | 'transaction' | 'friend'
  >;

  private readonly keywordSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  public keyword$: Observable<string>;

  constructor() {
    this.pageType$ = this.pageTypeSubject.asObservable();
    this.keyword$ = this.keywordSubject.asObservable();
    this.page$ = this.pageSubject.asObservable();
  }

  public handleChangePageType(pageType: PageType): void {
    this.pageTypeSubject.next(pageType);
  }

  public handleChangeKeyword(event: any): void {
    this.keywordSubject.next(event.detail.value);
  }

  public handleChangePage(
    page: 'index' | 'activity' | 'category' | 'transaction' | 'friend'
  ): void {
    this.pageSubject.next(page);
  }
}
