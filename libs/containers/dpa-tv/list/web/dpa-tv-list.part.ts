import { Component, SimpleChanges } from '@angular/core';
import { DpaTvListContainer } from '../dpa-tv-list.container';
@Component({
  selector: 'app-dpa-tv-list-part-web',
  templateUrl: './dpa-tv-list.part.html',
})
export class DpaTvListPartWeb extends DpaTvListContainer {
  override ngOnInit(): void {}

  override ngOnDestroy(): void {}

  override ngOnChanges(changes: SimpleChanges): void {}
}
