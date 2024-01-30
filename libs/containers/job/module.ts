import { NgModule } from '@angular/core';
// import { JobItemModule } from './item/module';

const MODULES: any[] = [];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class JobContainersModule {}
