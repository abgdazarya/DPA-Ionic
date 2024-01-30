import { NgModule } from '@angular/core';
import { ProfileOcrModalModule } from './ocr/module';
import { ProfileUserCardModalModule } from './user-card/module';
import { ProfileRelativeContactModalModule } from './relative-contact/module';

const MODULES: any[] = [
  ProfileOcrModalModule,
  ProfileUserCardModalModule,
  ProfileRelativeContactModalModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class ProfileModalsModule {}
