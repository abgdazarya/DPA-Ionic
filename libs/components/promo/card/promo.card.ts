import { Component, Input } from '@angular/core';
import { ComponentType } from '@components/common';
import { ContentPromo } from 'libs/controllers/menu/models/content-promo.model';

@Component({
  selector: 'promo-card',
  templateUrl: './promo.card.html',
})
export class PromoCard {
  @Input() public size: ComponentType = ComponentType.LARGE;
  @Input() public promo!: ContentPromo;

  public type: typeof ComponentType = ComponentType;
  constructor() {}
}
