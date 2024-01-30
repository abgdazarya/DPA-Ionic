import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  MenuNewsInteractionStoreModule,
  MenuNewsStoreModule,
} from '@stores/menu-news';
import { NewsHighlightContainer } from './news-highlight.container';

@NgModule({
  declarations: [NewsHighlightContainer],
  imports: [
    IonicModule,
    CommonModule,

    MenuNewsStoreModule,
    MenuNewsInteractionStoreModule,
  ],
  exports: [NewsHighlightContainer],
})
export class AppNewsHighlightContainerModule {}
