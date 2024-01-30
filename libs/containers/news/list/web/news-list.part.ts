import { Component, SimpleChanges } from '@angular/core';
import { NewsListContainer } from '../news-list.container';
@Component({
  selector: 'app-news-list-part-web',
  templateUrl: './news-list.part.html',
})
export class NewsListPartWeb extends NewsListContainer {
  override ngOnInit(): void {}

  override ngOnDestroy(): void {}

  override ngOnChanges(changes: SimpleChanges): void {}
}
