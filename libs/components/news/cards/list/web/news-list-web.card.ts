import { Component } from '@angular/core';
import { NewsListCardBase } from '../news-list.card.base';

@Component({
  selector: 'app-news-list-web-card',
  templateUrl: './news-list-web.card.html',
  styleUrls: ['./news-list-web.card.scss'],
})
export class NewsListWebCard extends NewsListCardBase {}
