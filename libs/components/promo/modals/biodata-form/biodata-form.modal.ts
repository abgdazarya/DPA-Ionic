import { Component, Input, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DetailProfile } from '@controllers/profile';
import { ModalController } from '@ionic/angular';
import { PromoFormRuleController } from 'libs/controllers/promotion/forms/promo.form';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { ShareMediaModal } from '../share-media/share-media.modal';
import { CouponVerifyModel } from 'libs/controllers/promotion/models/coupon-verify.model';
import { Observable } from 'rxjs';
import { DataResponse, InteractionState, InteractionType } from '@shared';
import {
  MenuPromotionInteractionRepository,
  MenuPromotionRepository,
} from '@stores/menu-promotion';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Store } from '@ngrx/store';
import {
  GetCouponVerify,
  GetCouponVerifyInteractionReset,
} from '@controllers/menu-promotion';

@Component({
  selector: 'promo-biodata-form-modal',
  templateUrl: './biodata-form.modal.html',
})
export class PromoBiodataFormModal {
  @Input() promoImg: string = '';
  @Input() userDetail: DetailProfile | any = {};
  @Input() handleOpenShareMediaModal: any = undefined;
  @Input() idPromosi: string = '';
  @Input() perusahaan: string = 'Astra Credit Company';

  public promoCode: string = '';
  public isError: any = null;
  public isSucces: any = null;

  public theme: string = 'transparent';
  public formGroup: FormGroup;

  public responseCoupon$: Observable<
    DataResponse<CouponVerifyModel> | undefined | null
  >;
  public interactionResponseCoupon$: Observable<
    InteractionState | undefined | null
  >;

  constructor(
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService,
    formController: PromoFormRuleController,
    private menuPromotionRepository: MenuPromotionRepository,
    private menuPromotionInteractionRepository: MenuPromotionInteractionRepository,
    private storageService: StorageService,
    public store: Store<CouponVerifyModel>
  ) {
    this.formGroup = formController.create();
    this.responseCoupon$ = this.menuPromotionRepository.getCouponVerify$();
    this.interactionResponseCoupon$ =
      this.menuPromotionInteractionRepository.getCouponVerifyInteraction$();
    this.interactionResponseCoupon$.subscribe((e: any) => {
      if (e.type == InteractionType.FAILED) {
        this.isError = true;
      } else if (e.type == InteractionType.SUCCEED) {
        this.isSucces = true;
        this.formGroup.get('kodePromosi')?.setValue(this.promoCode);
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.store.dispatch(GetCouponVerifyInteractionReset({ response: {} }));
  }
  ngOnInit(): void {
    this.initForms();
  }

  initForms = async () => {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    this.formGroup.get('idPromosi')?.setValue(this.idPromosi || '');
    this.formGroup.get('idProfilDpa')?.setValue(idProfilDpa || '');
    this.formGroup
      .get('namaPeserta')
      ?.setValue(this.userDetail?.namaPeserta || '');
    this.formGroup.get('email')?.setValue(this.userDetail?.email || '');
    this.formGroup.get('noHp')?.setValue(this.userDetail?.noHp || '');
    this.formGroup
      .get('perusahaan')
      ?.setValue(this.perusahaan || 'Astra Credit Company');
    this.formGroup.get('kodePromosi')?.setValue('');
    this.formGroup.controls['kodePromosi'].valueChanges.subscribe((value) => {
      this.isError = false;
      this.isSucces = false;
    });
  };

  public handleUsePromoCode(): void {
    this.onVerifyCoupon(this.promoCode);
    // this.isError =
    //   this.promoCode.toLocaleLowerCase() !== 'promo123' ? true : false;
  }

  public async handleClose() {
    await this.modalCtrl.dismiss();
  }

  public handleBack = async () => {
    await this.modalCtrl.dismiss({ back: true });
  };

  public async handleSubmit() {
    const payload: any = {
      idPromosi: this.formGroup.get('idPromosi')?.value,
      // idProfilDpa: this.formGroup.get('idProfilDpa')?.value,
      namaPeserta: this.formGroup.get('namaPeserta')?.value,
      email: this.formGroup.get('email')?.value,
      noHp: this.formGroup.get('noHp')?.value,
      perusahaan: this.formGroup.get('perusahaan')?.value,
      kodePromosi: this.formGroup.get('kodePromosi')?.value,
    };
    await this.modalCtrl.dismiss({ submitted: true, payload });
  }

  public rightBtn = () => {
    this.handleOpenShareMediaModal?.();
  };

  @HostListener('window:scroll', ['$event']) onContentScroll(event: any) {
    if (event.target.scrollTop >= 80) {
      this.theme = 'normal';
    } else {
      this.theme = 'transparent';
    }
  }

  onVerifyCoupon = (coupon: string) => {
    if (coupon) {
      const payload: any = {
        kodePromosi: coupon,
        idPromosi: this.idPromosi,
      };
      this.isError = false;
      this.isSucces = false;
      this.store.dispatch(GetCouponVerify({ payload }));
    }
  };
}
