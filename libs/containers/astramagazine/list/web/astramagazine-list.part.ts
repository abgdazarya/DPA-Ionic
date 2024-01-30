import { Component, SimpleChanges } from '@angular/core';
import { AstramagazineListContainer } from '../astramagazine-list.container';
@Component({
  selector: 'app-astramagazine-list-part-web',
  templateUrl: './astramagazine-list.part.html',
})
export class AstramagazineListPartWeb extends AstramagazineListContainer {
  override ngOnInit(): void {}
  override ngOnDestroy(): void {}
  override ngOnChanges(changes: SimpleChanges): void {}
}
