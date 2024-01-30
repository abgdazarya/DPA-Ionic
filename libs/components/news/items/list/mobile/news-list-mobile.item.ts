import { Component } from '@angular/core';
import { NewsListItemBase } from '../news-list.item.base';

@Component({
  selector: 'app-news-list-mobile-item',
  templateUrl: './news-list-mobile.item.html',
  styleUrls: ['./news-list-mobile.item.scss'],
})
export class NewsListMobileItem extends NewsListItemBase {}
