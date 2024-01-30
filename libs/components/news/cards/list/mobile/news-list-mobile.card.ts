import { Component } from '@angular/core';
import { NewsListCardBase } from '../news-list.card.base';

@Component({
  selector: 'app-news-list-mobile-card',
  templateUrl: './news-list-mobile.card.html',
  styleUrls: ['./news-list-mobile.card.scss'],
})
export class NewsListMobileCard extends NewsListCardBase {}
