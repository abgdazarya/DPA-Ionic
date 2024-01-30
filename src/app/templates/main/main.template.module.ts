import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppCommonIconComponentModule } from '@components/common';
import {
  AppCommonFooterContainerModule,
  AppCommonHeaderContainerModule,
} from '@containers/common';
import { IonicModule } from '@ionic/angular';
import {
  MenuDpaTvInteractionStoreModule,
  MenuDpaTvStoreModule,
} from '@stores/menu-dpa-tv';
import {
  MenuNewsInteractionStoreModule,
  MenuNewsStoreModule,
} from '@stores/menu-news';
import {
  ProfileInteractionStoreModule,
  ProfileStoreModule,
} from '@stores/profile';
import { AppMainTemplate } from './main.template';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';
import { QuizFloatingButtonModule } from 'libs/components/common/floating-button/quiz-floating-button/module';
import { AuthGuard } from 'libs/controllers/auth/guards/auth.guard';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import { PromotionGuard } from '@controllers/menu-promotion';
import { JobUserStatusGuard } from '@controllers/menu-job';
import { EKlaimUserStatusGuard } from 'libs/controllers/e-klaim';
import { LaporanInvestasiUserStatusGuard } from '@controllers/menu-laporan-investasi';
import { SimulasiMpUserStatusGuard } from 'libs/controllers/simulasi-mp';
import { AuthTokenGuard } from 'libs/controllers/auth/guards/auth-token.guard';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { AuthRedirectLoginGuard } from '@controllers/auth';
import { ProfileUserInfoGuard } from '@controllers/profile';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthTokenGuard],
    data: {
      accessable: true,
      callback: '/home',
    },
    loadChildren: () =>
      import('../../modules/home/home.page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'login',
    data: {
      accessable: true,
      callback: '/login',
    },
    loadChildren: () =>
      import('../../modules/login/login.page.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'profile',
    canActivate: [AuthTokenGuard],
    data: {
      accessable: false,
      callback: '/login',
    },
    loadChildren: () =>
      import('../../modules/profile/profile.page.module').then(
        (m) => m.ProfilePageModule
      ),
  },
  {
    path: 'astra-hub',
    canActivate: [AuthTokenGuard],
    data: {
      accessable: true,
      callback: '/astra-hub',
    },
    loadChildren: () =>
      import('../../modules/astra-hub/astra-hub.module').then(
        (m) => m.AstraHubModule
      ),
  },
  {
    path: 'dpatv',
    canActivate: [AuthTokenGuard],
    data: {
      accessable: true,
      callback: '/dpatv',
    },
    loadChildren: () =>
      import('../../modules/dpa-tv/pages/dpa-tv.module').then(
        (m) => m.DpaTvModule
      ),
  },
  {
    path: 'news',
    canActivate: [AuthTokenGuard],
    data: {
      accessable: true,
      callback: '/news',
    },
    loadChildren: () =>
      import('../../modules/news/pages/news.module').then((m) => m.NewsModule),
  },
  {
    path: 'astramagazine',
    canActivate: [AuthTokenGuard],
    data: {
      accessable: true,
      callback: '/astramagazine',
    },

    loadChildren: () =>
      import('../../modules/astramagazine/pages/astramagazine.module').then(
        (m) => m.AstramagazineModule
      ),
  },
  {
    path: 'job',
    canActivate: [AuthTokenGuard, JobUserStatusGuard],
    data: {
      accessable: true,
      callback: '/job',
    },
    loadChildren: () =>
      import('../../modules/job/pages/job.module').then((m) => m.JobModule),
  },
  {
    path: 'investasi',
    canActivate: [AuthTokenGuard, LaporanInvestasiUserStatusGuard],
    data: {
      accessable: false,
      callback: '/login',
    },
    loadChildren: () =>
      import('../../modules/investasi/pages/investasi.module').then(
        (m) => m.InvestasiModule
      ),
  },
  {
    path: 'pensiun',
    canActivate: [AuthTokenGuard],
    data: {
      accessable: true,
      callback: '/pensiun',
    },
    loadChildren: () =>
      import('../../modules/pensiun/pages/pensiun.module').then(
        (m) => m.PensiunModule
      ),
  },
  {
    path: 'promotion',
    canActivate: [AuthTokenGuard, PromotionGuard],
    data: {
      accessable: false,
      callback: '/login',
    },
    loadChildren: () =>
      import('../../modules/promotion/pages/promotion.module').then(
        (m) => m.PromotionModule
      ),
  },
  {
    path: 'simulasi-mp',
    data: {
      accessable: false,
      callback: '/login',
    },
    loadChildren: () =>
      import('../../modules/simulasi-mp/simulasi-mp.module').then(
        (m) => m.SimulasiMpModule
      ),

    canActivate: [AuthTokenGuard, SimulasiMpUserStatusGuard],
  },
  {
    path: 'saldo',
    canActivate: [AuthTokenGuard],

    data: {
      accessable: false,
      callback: '/login',
    },
    loadChildren: () =>
      import('../../modules/saldo/saldo.module').then((m) => m.SaldoModule),
  },
  {
    path: 'e-klaim',
    canActivate: [AuthTokenGuard, EKlaimUserStatusGuard],
    data: {
      accessable: false,
      callback: '/login',
    },
    loadChildren: () =>
      import('../../modules/e-klaim/e-klaim.module').then(
        (m) => m.EKlaimModule
      ),
  },
  {
    path: 'quiz',
    canActivate: [AuthTokenGuard],
    data: {
      accessable: false,
      callback: '/login',
    },
    loadChildren: () =>
      import('../../modules/quiz/quiz.module').then((m) => m.QuizModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('../../modules/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: 'device-rooted',
    loadChildren: () =>
      import('../../modules/device-rooted/device-rooted.module').then(
        (m) => m.DeviceRootedModule
      ),
  },
];

@NgModule({
  declarations: [AppMainTemplate],
  imports: [
    IonicModule,
    CommonModule,

    AppCommonIconComponentModule,
    AppCommonHeaderContainerModule,
    AppCommonFooterContainerModule,

    AuthStoreModule,
    AuthInteractionStoreModule,

    ProfileStoreModule,
    ProfileInteractionStoreModule,

    MenuStoreModule,
    MenuInteractionStoreModule,

    MenuNewsStoreModule,
    MenuNewsInteractionStoreModule,

    MenuDpaTvStoreModule,
    MenuDpaTvInteractionStoreModule,

    WaFloatingButtonModule,
    QuizFloatingButtonModule,

    RouterModule.forChild([
      {
        path: '',
        component: AppMainTemplate,
        children: routes,
      },
    ]),
  ],
})
export class AppMainTemplateModule {}
