import { Component, SimpleChanges } from '@angular/core';
import { AstramagazineListContainer } from '../astramagazine-list.container';
@Component({
  selector: 'app-astramagazine-list-part-mobile',
  templateUrl: './astramagazine-list.part.html',
})
export class AstramagazineListPartMobile extends AstramagazineListContainer {
  override ngOnInit(): void {}
  override ngOnDestroy(): void {}
  override ngOnChanges(changes: SimpleChanges): void {}
}
