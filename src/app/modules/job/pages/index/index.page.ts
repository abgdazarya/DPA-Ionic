import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ComponentType } from '@components/common';
import { NoPesertaData, StatusPesertaEnum } from '@controllers/auth';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-job-index-page',
  templateUrl: 'index.page.html',
  styleUrls: ['index.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthRepository, AuthInteractionRepository],
})
export class IndexPage implements OnInit {
  public type: typeof ComponentType = ComponentType;

  @HostListener('window:resize')
  public onResize() {
    this.getComponentType();
    this.onInitTheme();
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

  public statusPesertaEnum: typeof StatusPesertaEnum = StatusPesertaEnum;

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private router: Router,
    private location: Location,
    public screenSizeService: ScreenSizeService,
    private templateService: AppMainTemplateService,
    private storageService: StorageService,

    private cdr: ChangeDetectorRef
  ) {
    this.onInitTheme();
  }

  public async getValidation() {
    const noPeserta: NoPesertaData = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    if (noPeserta?.statusPeserta === this.statusPesertaEnum.AKTIF.toString())
      return false;

    return true;
  }

  onInitTheme = () => {
    this.templateService.handleInit();

    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none text-800'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('Informasi Pekerjaan');
    this.templateService.handleUseSecondaryHeader(true);
    this.templateService.handleOnBack(() => {
      this.router
        .navigate(['/home'], { onSameUrlNavigation: 'reload' })
        .then(() => {
          this.location.replaceState('/home');
        });
    });
  };

  ngOnInit(): void {
    this.onInitTheme();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
