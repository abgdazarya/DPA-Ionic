import { NgModule } from '@angular/core';
import { PilihKategoriModalModule } from './modals/pilih-kategori/module';
// import { PromoCardModule } from './card/module';

const MODULES: any[] = [
  PilihKategoriModalModule,
];


@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class RuangPensiunComponentsModule {}
