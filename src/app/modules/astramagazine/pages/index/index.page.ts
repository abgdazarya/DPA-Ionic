import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentType } from '@components/common';
import {
  AstramagazineModel,
  AstramagazineOptionModel,
} from '@controllers/menu-astramagazine';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { MenuAstramagazineRepository } from '@stores/menu-astramagazine';
import { IOption } from 'libs/components/common/select/option.type';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { Observable, filter, map } from 'rxjs';
import { MonthOption } from 'src/app/modules/saldo/const/month';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { ModalController } from '@ionic/angular';
import { MonthYearPickerComponent } from 'libs/components/common/month-year-picker/month-year-picker.component';

@Component({
  selector: 'app-astramagazine-index-page',
  templateUrl: 'index.page.html',
  styleUrls: ['index.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthRepository, AuthInteractionRepository],
})
export class IndexPage implements OnInit, OnDestroy {
  astraMagazineForm!: FormGroup;
  monthOptions: IOption[] = MonthOption;
  yearOptions: IOption[] = [];
  kategoriOptions: IOption[] = [];
  public type: typeof ComponentType = ComponentType;
  public astramagazineOption$: Observable<
    AstramagazineOptionModel | undefined | null
  >;

  public keyword: string = '';
  @Input() errorMsg: any = '';

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
    public menuAstramagazineRepo: MenuAstramagazineRepository,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    private location: Location,
    private modalCtrl: ModalController,
    private cdr: ChangeDetectorRef
  ) {
    this.astramagazineOption$ = this.menuAstramagazineRepo
      .getAstramagazineOption$()
      .pipe(
        filter((res) => !!res),
        map((res) => {
          if (!res?.data) return null;
          return res?.data;
        })
      );
  }

  handleChangeTemplateService() {
    this.templateService.handleInit();
    this.templateService.handleShowFooter(this.screenSizeService.isMobileResolution() ? false:true);
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
        : 'bg-bg-0 h-[78px]'
    );
    this.templateService.handleChangePageTitle('AstraMagz');
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
    this.initForm();
    this.initYearOptions();

    this.initKategoriOptions();
    this.handleChangeTemplateService();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  initForm(): void {
    this.astraMagazineForm = new FormGroup({
      kategori: new FormControl(null, Validators.required),
      year: new FormControl(new Date().getFullYear()),
      month: new FormControl(new Date().getMonth() + 1),
    });
  }

  initYearOptions() {
    const current = new Date().getFullYear();
    const twoYearsAgo = new Date().getFullYear() - 2;
    for (let i = twoYearsAgo; i <= current; i++) {
      this.yearOptions.push({ id: i, label: i.toString() });
    }
  }

  initKategoriOptions() {
    this.astramagazineOption$.subscribe((res: any) => {
      this.kategoriOptions = [];
      if (res) {
        res?.kategori.map((el: any) => {
          let dt = {
            id: el.idKategoriAstramagz,
            label: el.namaKategoriAstramagazine,
          };
          this.kategoriOptions.push(dt);
        });
      }
    });
  }
  
  handleErrorPdf(evt:any) {
    this.errorMsg = evt;
    setTimeout(() => {
      this.errorMsg = '';
    }, 3000);
    this.cdr.markForCheck();
    return;
  }

  public dateChange(val: string) {
    const month = val.split(' ')[0];
    const year = val.split(' ')[1];
    this.astraMagazineForm.get('month')?.setValue(month);
    this.astraMagazineForm.get('year')?.setValue(year);
    this.filter();
  }

  filterData: any;
  public filter() {
    this.filterData = {
      month: this.astraMagazineForm.get('month')?.value,
      year: this.astraMagazineForm.get('year')?.value,
      kategori: this.astraMagazineForm.get('kategori')?.value,
    };
  }

  monthDate:any = '';
  async openMonthYearModal() {
    const modal = await this.modalCtrl.create({
      component: MonthYearPickerComponent,
      backdropDismiss: true,
      cssClass: 'modal-transparent',
    });
    modal.present();

    modal.onDidDismiss().then(({ data }) => {     
      const month = data.dateVal.split(' ')[0];
      const year = data.dateVal.split(' ')[1];
      this.astraMagazineForm.get('month')?.setValue(month);
      this.astraMagazineForm.get('year')?.setValue(year);
      this.monthDate = data?.date;
      this.cdr.markForCheck();
      this.filter();
    });
  }

  public handleNavigateUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  bulanDropdownChange = async (value: any) => {
    await this.astraMagazineForm.get('month')?.setValue(value);
  };

  tahunDropdownChange = async (value: any) => {
    await this.astraMagazineForm.get('year')?.setValue(value);
  };

  categoryDropdownChange = async (value: any) => {
    if(value) {
      this.astraMagazineForm.get('kategori')?.setValue(value);
    this.cdr.markForCheck();
    this.filter();
    }
  };

  ngOnDestroy(): void {
    this.keyword = '';
  }
}
