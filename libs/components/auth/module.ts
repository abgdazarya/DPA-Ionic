import { NgModule } from '@angular/core';
import { AuthModalsModule } from './modals/module';

const MODULES: any[] = [AuthModalsModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class AuthComponentsModule {}
