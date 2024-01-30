import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ComponentType } from '@components/common';
import { GetCategoryPromotion } from '@controllers/menu-promotion';
import { UserDetail } from '@controllers/profile';
import { Store } from '@ngrx/store';
import { DataResponseArray, InteractionState } from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import {
  MenuPromotionInteractionRepository,
  MenuPromotionRepository,
} from '@stores/menu-promotion';
import { ProfileRepository } from '@stores/profile';
import { ContentPromo } from 'libs/controllers/menu/models/content-promo.model';
import { CategoryPromotionModel } from 'libs/controllers/promotion/models/category-promotion.model';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable } from 'rxjs';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-promotion-index-page',
  templateUrl: 'index.page.html',
  styleUrls: ['index.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthRepository,
    AuthInteractionRepository,
    MenuPromotionRepository,
    MenuPromotionInteractionRepository,
  ],
})
export class IndexPage implements OnInit {
  public type: typeof ComponentType = ComponentType;
  // @ViewChildren(IonContent) parent: undefined | IonContent = undefined;

  @HostListener('window:resize')
  public onResize() {
    this.getComponentType();
    this.handleChangeTemplateService();
  }

  public getComponentType(): ComponentType {
    const win = window;

    if (win.innerWidth <= 640) {
      return this.type.SMALL;
    }

    if (win.innerWidth > 640 && win.innerWidth <= 1024) {
      return this.type.MEDIUM;
    }

    return this.type.LARGE;
  }

  public keyword: string = '';
  public listPromotion: ContentPromo[] | any = [];

  public responseCategory$: Observable<
    DataResponseArray<CategoryPromotionModel> | undefined | null
  >;
  public interactionResponseCategory$: Observable<
    InteractionState | undefined | null
  >;

  public categoryId: string | any = '';
  private paramsEventListener: any = null;
  constructor(
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    private store: Store,
    private storageService: StorageService,
    private servicePromotion: MenuPromotionRepository,
    private servicePromotionInteraction: MenuPromotionInteractionRepository,
    private cdr: ChangeDetectorRef,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.responseCategory$ = this.servicePromotion.getCategoryPromotion$();
    this.interactionResponseCategory$ =
      this.servicePromotionInteraction.getCategoryPromotionInteraction$();
    this.paramsEventListener = this.activeRoute.params.subscribe((params) => {
      this.categoryId = params['idType'];
    });
  }

  handleChangeTemplateService() {
    this.templateService.handleInit();
    this.templateService.handleShowFooter(true);
    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeIonContentClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'ion-background-white relative'
        : 'ion-background-white relative'
    );
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('Promosi');
    this.templateService.handleUseSecondaryHeader(true);
    this.templateService.handleOnBack(() => {
      this.router.navigate(['/home']);
    });
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.fetchUserDetail();
    setTimeout(() => {
      this.handleChangeTemplateService();
    }, 0);
    this.callCategoryPromotion();
  }

  callCategoryPromotion = async () => {
    this.store.dispatch(
      GetCategoryPromotion({
        payload: {},
      })
    );
  };

  ngOnDestroy(): void {
    this.paramsEventListener.unsubscribe();
  }

  async fetchUserDetail() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const payload = {};
    if (!idProfilDpa) return;
    this.store.dispatch(UserDetail({ payload }));
    return idProfilDpa;
  }
}
