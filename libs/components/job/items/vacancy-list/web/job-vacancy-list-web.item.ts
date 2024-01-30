import { Component } from '@angular/core';
import { JobVacancyListItemBase } from '../job-vacancy-list.item.base';

@Component({
  selector: 'app-job-vacancy-list-web-item',
  templateUrl: './job-vacancy-list-web.item.html',
  styleUrls: ['./job-vacancy-list-web.item.scss'],
})
export class JobVacancyListWebItem extends JobVacancyListItemBase {}
