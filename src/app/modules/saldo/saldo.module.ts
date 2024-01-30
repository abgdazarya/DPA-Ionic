import { LOCALE_ID, NgModule } from '@angular/core';
import localeId from '@angular/common/locales/id';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { SaldoRoutingModule } from './saldo.routing.module';
import { IonicModule } from '@ionic/angular';
import { SaldoPage } from './saldo.page';
import { PinInputComponent } from 'libs/components/auth/modals/pin-input/pin-input.component';
import { HeaderSecondComponent } from 'libs/components/common/header-second/header-second.component';
import { SaldoCardComponent } from './components/saldo-card/saldo-card.component';
import { TextInputComponent } from 'libs/components/common/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonthYearDialogComponent } from 'libs/components/common/month-year-dialog/month-year-dialog.component';
import {
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';
import { SelectComponent } from 'libs/components/common/select/select.component';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';

registerLocaleData(localeId, 'id');

@NgModule({
  declarations: [SaldoPage],
  imports: [
    CommonModule,
    SaldoRoutingModule,
    PinInputComponent,
    IonicModule,
    HeaderSecondComponent,
    SaldoCardComponent,
    TextInputComponent,
    ReactiveFormsModule,
    FormsModule,
    MonthYearDialogComponent,
    AppCommonIconComponentModule,
    CommonHeaderComponentModule,
    CommonFooterComponentModule,
    SelectComponent,
    MenuStoreModule,
    MenuInteractionStoreModule,
    CommonAlertComponentModule,
    WaFloatingButtonModule,
  ],
  providers: [
    DatePipe,
    {
      provide: LOCALE_ID,
      useValue: 'id',
    },
  ],
})
export class SaldoModule {}
