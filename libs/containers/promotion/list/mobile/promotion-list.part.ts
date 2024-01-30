import { Component, SimpleChanges } from '@angular/core';
import { PromotionListContainer } from '../promotion-list.container';

@Component({
  selector: 'app-promotion-list-part-mobile',
  templateUrl: './promotion-list.part.html',
})
export class PromotionListPartMobile extends PromotionListContainer {
  override ngOnInit(): void {}

  override ngOnDestroy(): void {}

  override ngOnChanges(changes: SimpleChanges): void {}
}
