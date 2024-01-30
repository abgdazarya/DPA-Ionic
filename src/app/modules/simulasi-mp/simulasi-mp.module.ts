import { LOCALE_ID, NgModule } from '@angular/core';
import localeId from '@angular/common/locales/id';
import { CommonModule, registerLocaleData } from '@angular/common';
import { SimulasiMpPage } from './simulasi-mp.page';
import { SimulasiMpRoutingModule } from './simulasi.routing.module';
import { TextInputComponent } from 'libs/components/common/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderSecondComponent } from 'libs/components/common/header-second/header-second.component';
import {
  AppCommonIconComponentModule,
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
} from '@components/common';
import { HasilSimulasiComponent } from './components/hasil-simulasi/hasil-simulasi.component';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyModule } from 'libs/components/common/currency-input/currency-module';
import { SimulasiMpControllersModule } from 'libs/controllers/simulasi-mp';
import { HttpClientModule } from '@angular/common/http';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';
import { SimulasiService } from './simulasi.service';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
registerLocaleData(localeId, 'id');

@NgModule({
  declarations: [SimulasiMpPage],
  imports: [
    CommonModule,
    SimulasiMpRoutingModule,
    TextInputComponent,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    HeaderSecondComponent,
    CommonHeaderComponentModule,
    CommonFooterComponentModule,
    HasilSimulasiComponent,
    NgxMaskModule.forRoot(),
    CommonAlertComponentModule,
    AppCommonIconComponentModule,
    CurrencyModule,
    SimulasiMpControllersModule,
    HttpClientModule,
    ProfileHeaderComponentModule,
    MenuStoreModule,
    MenuInteractionStoreModule,
    TransformersModule,
  ],
  providers: [
    SimulasiService,
    {
      provide: LOCALE_ID,
      useValue: 'id',
    },
  ],
})
export class SimulasiMpModule {}