import { Component } from '@angular/core';
import { RuangPensiunListContainer } from '../ruang-pensiun-list.container';
@Component({
  selector: 'app-ruang-pensiun-list-part-web',
  templateUrl: './ruang-pensiun-list.part.html',
})
export class RuangPensiunListPartWeb extends RuangPensiunListContainer {
  override async ngOnInit(): Promise<void> {}

  override ngOnDestroy(): void {}

  override async ngOnChanges(changes: any): Promise<void> {}
}
