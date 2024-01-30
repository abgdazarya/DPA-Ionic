import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonIconComponentModule } from '@components/common';
import { AuthPipesModule } from '@controllers/auth';
import { IonicModule } from '@ionic/angular';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { AuthUserNumberContainer } from './user-number.container';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';

@NgModule({
  declarations: [AuthUserNumberContainer],
  imports: [
    IonicModule,
    CommonModule,

    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,

    AuthStoreModule,
    AuthInteractionStoreModule,

    AuthPipesModule,
  ],

  exports: [AuthUserNumberContainer],
})
export class AppAuthUserNumberContainerModule {}
