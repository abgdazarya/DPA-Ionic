import { NgModule } from '@angular/core';
import { ProfileModalsModule } from './modals/module';

const MODULES: any[] = [ProfileModalsModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class ProfileComponentsModule {}
