import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '@shared';

@Component({
  selector: 'app-common-pagination-component',
  templateUrl: './pagination.component.html',
})
export class CommonPaginationComponent {
  @Input() pagination!: Pagination;
  @Input() loading!: boolean;
  @Input() showMiddlePage: number = 5;
  @Input() type: 'web' | 'mobile' = 'web';

  @Output() onClick: EventEmitter<number> = new EventEmitter<number>();

  public getPages(): number[] {
    let arr = [];

    for (let index = 1; index <= this.pagination.totalPage; index++) {
      arr.push(index);
    }

    if (
      this.pagination.page + this.showMiddlePage <=
      this.pagination.totalPage
    ) {
      arr = arr.slice(
        this.pagination.page - 1,
        this.pagination.page + this.showMiddlePage - 1
      );
    }

    if (
      this.pagination.page + this.showMiddlePage >
      this.pagination.totalPage
    ) {
      arr = arr.slice(-this.showMiddlePage);
    }

    return arr;
  }
}
