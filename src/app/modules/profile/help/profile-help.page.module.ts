import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProfileHelpPage } from './profile-help.page';
import { CommonComponentsModule } from '@components/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from 'libs/components/common/select/select.component';
import { AccordionComponent } from 'libs/components/common/accordion/accordion.component';
import { AccordionTitleTransformerPipe } from 'libs/pipes/transformers/accordion-title/accordion-title-transformer.pipe';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';
import { SelectPopupModule } from 'libs/components/common/select-popup/module';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';

@NgModule({
  declarations: [ProfileHelpPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    CommonComponentsModule,
    ReactiveFormsModule,
    SelectComponent,
    AccordionComponent,
    TransformersModule,
    SelectPopupModule,

    MenuStoreModule,
    MenuInteractionStoreModule,

    RouterModule.forChild([
      {
        path: '',
        component: ProfileHelpPage,
      },
    ]),
  ],
})
export class ProfileHelpPageModule {}
