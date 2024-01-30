import { Component, SimpleChanges } from '@angular/core';
import { PromotionListContainer } from '../promotion-list.container';

@Component({
  selector: 'app-promotion-list-part-web',
  templateUrl: './promotion-list.part.html',
})
export class PromotionListPartWeb extends PromotionListContainer {
  override ngOnInit(): void {}

  override ngOnDestroy(): void {}

  override ngOnChanges(changes: SimpleChanges): void {}
}
