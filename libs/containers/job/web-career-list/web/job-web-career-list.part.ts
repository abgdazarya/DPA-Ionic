import { Component, SimpleChanges } from '@angular/core';
import { WebCareerListContainer } from '../job-web-career-list.container';
@Component({
  selector: 'app-job-web-career-list-part-web',
  templateUrl: './job-web-career-list.part.html',
})
export class WebCareerListPartWeb extends WebCareerListContainer {
  override ngOnInit(): void {}

  override ngOnDestroy(): void {}

  override ngOnChanges(changes: SimpleChanges): void {}
}
