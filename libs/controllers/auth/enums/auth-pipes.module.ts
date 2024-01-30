import { NgModule } from '@angular/core';
import { StatusPesertaEnumPipe } from './status-peserta-enum';

const PIPES: any[] = [StatusPesertaEnumPipe];

@NgModule({
  declarations: [...PIPES],
  imports: [],
  exports: [...PIPES],
})
export class AuthPipesModule {}
