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
  selector: 'app-device-rooted',
  templateUrl: './device-rooted.page.html',
  styleUrls: ['./device-rooted.page.scss'],
})
export class DeviceRootedPage implements OnInit {
  @HostListener('window:resize')
  public onResize() {
    this.handleChangeTemplateService();
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
  }

  handleChangeTemplateService() {
    this.templateService.handleInit();
    this.templateService.handleShowFooter(false);
    this.templateService.handleShowHeader(false);
    this.templateService.handleShowIconFloating(false);
    this.templateService.handleShowFloatingButton(false);
    this.cdr.markForCheck();
  }
}
