import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, ComponentType } from '@components/common';
import { GetDetailJob, GetListJob } from '@controllers/menu-job';
import { Store } from '@ngrx/store';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { MenuJobState } from '@stores/menu-job';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-job-detail-page',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthRepository, AuthInteractionRepository],
})
export class DetailPage implements OnInit {
  public type: typeof ComponentType = ComponentType;

  public breadcrumbs: Breadcrumb[] = [
    { label: 'Home', link: '/home' },
    { label: 'Lowongan Kerja', link: '/job/vacancy' },
    { label: 'Detail Lowongan Kerja', link: '' },
  ];

  @HostListener('window:resize')
  public onResize() {
    this.getComponentType();
    this.handleChangeTemplateService();
  }

  public getComponentType(): ComponentType {
    const win = window;

    if (win.innerWidth <= 640) {
      return this.type.SMALL;
    }

    if (win.innerWidth > 640 && win.innerWidth <= 1024) {
      return this.type.MEDIUM;
    }

    return this.type.LARGE;
  }

  constructor(
    private store: Store<MenuJobState>,
    private router: Router,
    private route: ActivatedRoute,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    public cdr: ChangeDetectorRef
  ) {
    this.handleChangeTemplateService();
  }

  public handleSelectBreadcrumb(link: string): void {
    if (!link) return;
    this.router.navigateByUrl(link);
  }

  handleChangeTemplateService() {
    this.templateService.handleInit();

    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none text-800'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('Detail Pekerjaan');
    this.templateService.handleUseSecondaryHeader(true);
    this.templateService.handleOnBack(null);
    this.cdr.markForCheck();
    this.templateService.handleOnBack(undefined);
  }

  ngOnInit(): void {
    this.handleChangeTemplateService();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.store.dispatch(
      GetListJob({
        payload: {
          page: 1,
          limit: 5,
        },
        dataType: 'recommendation',
      })
    );

    const { idJob } = this.route.snapshot.params;

    if (!idJob) return;
    const payload = {
      idJob,
    };
    this.store.dispatch(GetDetailJob({ payload }));
  }
}
