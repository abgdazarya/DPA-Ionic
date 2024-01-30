import { Component } from '@angular/core';
import { PromotionListCardBase } from '../promotion-list.card.base';

@Component({
  selector: 'app-promotion-list-web-card',
  templateUrl: './promotion-list-web.card.html',
  styleUrls: ['./promotion-list-web.card.scss'],
})
export class PromotionListWebCard extends PromotionListCardBase {}
