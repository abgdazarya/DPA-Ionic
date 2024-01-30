import { NgModule } from '@angular/core';
import { StatusApprovalEnumPipe } from './status-approval-enum';

const PIPES: any[] = [StatusApprovalEnumPipe];

@NgModule({
  declarations: [...PIPES],
  imports: [],
  exports: [...PIPES],
})
export class MenuPipesModule {}
