import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstraHubPage } from './astra-hub.page';
import { AccordionComponent } from 'libs/components/common/accordion/accordion.component';
import { AstraHubRoutingModule } from './astra-hub.routing.module';
import { IonicModule } from '@ionic/angular';
import {
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
} from '@components/common';
import { AppCommonIconComponentModule } from '@components/common';
import { HeaderSecondComponent } from 'libs/components/common/header-second/header-second.component';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';
@NgModule({
  declarations: [AstraHubPage],
  imports: [
    CommonModule,
    IonicModule,
    AccordionComponent,
    AstraHubRoutingModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,
    HeaderSecondComponent,
    CommonFooterComponentModule,
    MenuStoreModule,
    MenuInteractionStoreModule,
    TransformersModule,
    WaFloatingButtonModule,
  ],
  providers: [ProfileRepository, ProfileInteractionRepository],
})
export class AstraHubModule {}
