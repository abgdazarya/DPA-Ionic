import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AppCommonIconComponentModule } from '../icon/module';
import { Breadcrumb } from './bradcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  standalone: true,
  imports: [CommonModule, AppCommonIconComponentModule],
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadcrumbs: Breadcrumb[] = [];
  constructor() {}

  ngOnInit() {}
}
