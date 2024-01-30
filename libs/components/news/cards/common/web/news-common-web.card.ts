import { Component } from '@angular/core';
import { NewsCommonCardBase } from '../news-common.card.base';

@Component({
  selector: 'app-news-common-web-card',
  templateUrl: './news-common-web.card.html',
  styleUrls: ['./news-common-web.card.scss'],
})
export class NewsCommonWebCard extends NewsCommonCardBase {}
