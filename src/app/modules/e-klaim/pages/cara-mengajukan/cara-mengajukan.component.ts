import { Component, OnInit } from '@angular/core';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-cara-mengajukan',
  templateUrl: './cara-mengajukan.component.html',
  styleUrls: ['./cara-mengajukan.component.scss'],
})
export class CaraMengajukanComponent implements OnInit {
  constructor(
    public templateService: AppMainTemplateService,
    public screenSizeService: ScreenSizeService
  ) {
    this.templateService.handleInit();

    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none text-800'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('Cara Mengajukan e-Klaim');
    this.templateService.handleUseSecondaryHeader(true);
  }

  ngOnInit() {}
}
