import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Breadcrumb } from './breadcrumb.interface';

@Component({
  selector: 'app-common-breadcrumb-component',
  templateUrl: './breadcrumb.component.html',
})
export class CommonBreadcrumbComponent {
  @Input() public loading?: boolean | null = false;
  @Input() public breadcrumbs!: Breadcrumb[] | null | undefined;
  @Input() public length: number = 3;
  @Input() public class?: string = '';
  @Input() public activeClass?: string = '';

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
}
