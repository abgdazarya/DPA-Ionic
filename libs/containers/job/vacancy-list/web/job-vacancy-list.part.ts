import { Component, SimpleChanges } from '@angular/core';
import { VacancyListContainer } from '../job-vacancy-list.container';

@Component({
  selector: 'app-job-vacancy-list-part-web',
  templateUrl: './job-vacancy-list.part.html',
})
export class VacancyListPartWeb extends VacancyListContainer {
  override ngOnInit(): void {}

  override ngOnDestroy(): void {}

  override ngOnChanges(changes: SimpleChanges): void {}
}
