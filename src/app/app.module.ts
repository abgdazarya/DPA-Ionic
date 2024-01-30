import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { PhotoLibrary } from '@awesome-cordova-plugins/photo-library/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import {
  AuthHttpClient,
  EklaimAjukanHttpClient,
  EklaimLoginHttpClient,
  EklaimTrackHttpClient,
  HomeHttpClient,
  MasterHttpClient,
  MenuHttpClient,
  MenuPublicHttpClient,
  ProfileHttpClient,
  QuizHttpClient,
  RefreshTokenHttpClient,
  SimulasiMpHttpClient,
} from '@clients';
import { AppCommonIconComponentModule } from '@components/common';
import { AuthGuard } from '@controllers/auth';
import { JobUserStatusGuard } from '@controllers/menu-job';
import { LaporanInvestasiUserStatusGuard } from '@controllers/menu-laporan-investasi';
import { PromotionGuard } from '@controllers/menu-promotion';
import { ProfileUserInfoGuard } from '@controllers/profile';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ButtonSecondaryHeaderDirective } from 'libs/containers/common/header/common-header.container';
import { AuthTokenGuard } from 'libs/controllers/auth/guards/auth-token.guard';
import { EKlaimUserStatusGuard } from 'libs/controllers/e-klaim';
import { SimulasiMpUserStatusGuard } from 'libs/controllers/simulasi-mp';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppComponentService } from './app.component.service';
import { AppInitializer } from './app.initializer';
import { AppRoutingModule } from './app.routes';

const CLIENT_MODULES: any[] = [
  AuthHttpClient,
  RefreshTokenHttpClient,
  ProfileHttpClient,
  HomeHttpClient,
  MenuHttpClient,
  MenuPublicHttpClient,
  MasterHttpClient,
  QuizHttpClient,
  SimulasiMpHttpClient,
  EklaimLoginHttpClient,
  EklaimAjukanHttpClient,
  EklaimTrackHttpClient,
];
const GUARD_MODULES: any[] = [
  AuthGuard,
  AuthTokenGuard,
  PromotionGuard,
  JobUserStatusGuard,
  EKlaimUserStatusGuard,
  LaporanInvestasiUserStatusGuard,
  SimulasiMpUserStatusGuard,
  ProfileUserInfoGuard,
];

@NgModule({
  imports: [
    AppCommonIconComponentModule,
    ButtonSecondaryHeaderDirective,
    BrowserModule,
    IonicModule.forRoot(),
    StoreModule.forRoot(),
    EffectsModule.forRoot([]),
    HttpClientModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: false,
    //   registrationStrategy: 'registerWhenStable:30000',
    // }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    ...GUARD_MODULES,
    ...CLIENT_MODULES,
    AppInitializer,
    AppComponentService,
    File,
    FileTransfer,
    Device,
    AndroidPermissions,
    PhotoLibrary,
    DeviceDetectorService,
    HTTP,
  ],
})
export class AppModule {}
