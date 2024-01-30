import { Component } from '@angular/core';
import { PromotionListCardBase } from '../promotion-list.card.base';

@Component({
  selector: 'app-promotion-list-mobile-card',
  templateUrl: './promotion-list-mobile.card.html',
  styleUrls: ['./promotion-list-mobile.card.scss'],
})
export class PromotionListMobileCard extends PromotionListCardBase {}
