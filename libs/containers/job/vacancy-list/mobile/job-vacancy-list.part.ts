import { Component, SimpleChanges } from '@angular/core';
import { VacancyListContainer } from '../job-vacancy-list.container';

@Component({
  selector: 'app-job-vacancy-list-part-mobile',
  templateUrl: './job-vacancy-list.part.html',
})
export class VacancyListPartMobile extends VacancyListContainer {
  override ngOnInit(): void {}

  override ngOnDestroy(): void {}

  override ngOnChanges(changes: SimpleChanges): void {}
}
