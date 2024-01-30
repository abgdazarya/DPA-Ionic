import { Component } from '@angular/core';
import { JobVacancyListItemBase } from '../job-vacancy-list.item.base';

@Component({
  selector: 'app-job-vacancy-list-mobile-item',
  templateUrl: './job-vacancy-list-mobile.item.html',
  styleUrls: ['./job-vacancy-list-mobile.item.scss'],
})
export class JobVacancyListMobileItem extends JobVacancyListItemBase {}
