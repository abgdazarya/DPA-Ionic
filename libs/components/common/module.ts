import { NgModule } from '@angular/core';
import { AppCommonIconComponentModule } from './icon/module';

const MODULES: any[] = [AppCommonIconComponentModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class CommonComponentsModule {}
