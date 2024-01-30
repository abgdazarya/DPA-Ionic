import { Component } from '@angular/core';
import { NewsCommonCardBase } from '../news-common.card.base';

@Component({
  selector: 'app-news-common-mobile-card',
  templateUrl: './news-common-mobile.card.html',
  styleUrls: ['./news-common-mobile.card.scss'],
})
export class NewsCommonMobileCard extends NewsCommonCardBase {}
