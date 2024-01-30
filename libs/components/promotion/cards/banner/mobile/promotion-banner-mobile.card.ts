import { Component } from '@angular/core';
import { PromotionBannerCardBase } from '../promotion-banner.card.base';

@Component({
  selector: 'app-promotion-banner-mobile-card',
  templateUrl: './promotion-banner-mobile.card.html',
  styleUrls: ['./promotion-banner-mobile.card.scss'],
})
export class PromotionBannerMobileCard extends PromotionBannerCardBase {}
