import { Component } from '@angular/core';
import { NewsFooterItemBase } from '../news-footer.item.base';

@Component({
  selector: 'app-news-footer-web-item',
  templateUrl: './news-footer-web.item.html',
  styleUrls: ['./news-footer-web.item.scss'],
})
export class NewsFooterWebItem extends NewsFooterItemBase {}
