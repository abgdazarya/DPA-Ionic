import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {
  @HostListener('window:resize')
  public onResize() {
    this.handleChangeTemplateService();
  }

  handleChangeTemplateService() {
    this.templateService.handleInit();
    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none'
        : 'bg-bg-0 h-[78px]'
    );
    this.templateService.handleChangePageTitle('Kembali');
    this.templateService.handleUseSecondaryHeader(true);
    this.cdr.markForCheck();
  }

  constructor(
    public templateService: AppMainTemplateService,
    public screenSizeService: ScreenSizeService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.handleChangeTemplateService();
    }, 0);

    this.templateService.handleOnBack(() => {
      this.router
        .navigate(['/home'], { onSameUrlNavigation: 'reload' })
        .then(() => {
          this.location.replaceState('/home');
        });
    });
  }
}
