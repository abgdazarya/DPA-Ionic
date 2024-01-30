import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ComponentType } from '@components/common';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-news-index-page',
  templateUrl: 'index.page.html',
  styleUrls: ['index.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthRepository, AuthInteractionRepository],
})
export class IndexPage implements OnInit, OnDestroy {
  public type: typeof ComponentType = ComponentType;

  public keyword: string = '';

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
    private router: Router,
    public screenSizeService: ScreenSizeService,
    private location: Location,
    public templateService: AppMainTemplateService,
    private cdr: ChangeDetectorRef
  ) {}

  public handleNavigateUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  handleChangeTemplateService() {
    this.templateService.handleInit();
    this.templateService.handleShowFooter(
      this.screenSizeService.isMobileResolution() ? false : true
    );
    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeIonContentClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'ion-background-white-blur relative'
        : 'relative'
    );
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('Baca');
    this.templateService.handleUseSecondaryHeader(true);
    this.templateService.handleOnBack(() => {
      this.router
        .navigate(['/home'], { onSameUrlNavigation: 'reload' })
        .then(() => {
          this.location.replaceState('/home');
        });
    });
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.handleChangeTemplateService();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.keyword = '';
  }
}
