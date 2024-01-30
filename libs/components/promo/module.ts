import { NgModule } from '@angular/core';
import { PromoCardModule } from './card/module';

const MODULES: any[] = [PromoCardModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class PromoComponentsModule {}
