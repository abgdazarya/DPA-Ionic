import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  getMonthlySaldo,
  GetSaldo,
  GetSaldoReset,
  SaldoData,
} from '@controllers/menu';
import { Store } from '@ngrx/store';
import { DataResponse, InteractionState, InteractionType } from '@shared';
import { MenuInteractionRepository, MenuRepository } from '@stores/menu';
import { IOption } from 'libs/components/common/select/option.type';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { filter, Observable } from 'rxjs';
import { MonthOption } from './const/month';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.page.html',
  styleUrls: ['./saldo.page.scss'],
  providers: [MenuRepository, MenuInteractionRepository],
})
export class SaldoPage implements OnInit {
  saldoForm!: FormGroup;
  date = Date.now();
  isStop = false;
  yearOptions: IOption[] = [];
  monthOptions: IOption[] = MonthOption;
  public response$: Observable<DataResponse<SaldoData> | undefined | null>;
  public interactionResponse$: Observable<InteractionState>;
  public monthlyResponse$: Observable<
    DataResponse<SaldoData> | undefined | null
  >;
  public monthlyInteractionResponse$: Observable<InteractionState>;
  public interactionType = InteractionType;
  public errorMsg: string | any = '';
  public errorMsgToken: string | any = '';
  public monthYear: string | any = '';
  constructor(
    private store: Store,
    private menuRepository: MenuRepository,
    private menuInteractionRepository: MenuInteractionRepository,
    private datePipe: DatePipe,
    public templateService: AppMainTemplateService,
    private storageService: StorageService,
    public screenSizeService: ScreenSizeService,
    private router: Router,
    private location: Location
  ) {
    this.initForm();
    this.initYearOptions();
    this.response$ = this.menuRepository.getSaldo$();
    this.interactionResponse$ =
      this.menuInteractionRepository.getSaldoInteraction$();
    this.monthlyResponse$ = this.menuRepository.getMonthlySaldo$();
    this.monthlyInteractionResponse$ =
      this.menuInteractionRepository.getMonthlySaldoInteraction$();
    // this.response$
    //   .pipe(
    //     filter((data) => {

    //       this.setTitleStatus()
    //     })
    //   )
    //   .subscribe((data) => {

    //     this.monthYear = `${
    //       this.monthOptions[Number(data?.data?.month) - 1].label
    //     }  ${data?.data?.year}`;
    //   });
    this.response$.subscribe((item) => {
      this.setTitleStatus();
    });
    this.handleChangeTemplateService();

    this.monthlyInteractionResponse$.subscribe((res) => {
      if (res.type === this.interactionType.FAILED) {
        this.errorMsg = res.error;
        if (
          res?.error
            ?.toString?.()
            .toLowerCase?.()
            ?.match?.(/gagal verifikasi/gi)
        ) {
          this.errorMsgToken = res.error;
          setTimeout(this.restorePos, 3500);
        }
      }
    });
  }

  restorePos = () => {
    this.router
      .navigate(['/home'], { onSameUrlNavigation: 'reload' })
      .then(() => {
        this.location.replaceState('/home');
      });
  };

  handleChangeTemplateService() {
    this.templateService.handleInit();

    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none text-800'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('Saldo');
    this.templateService.handleUseSecondaryHeader(true);
    this.templateService.handleShowFooter(
      this.screenSizeService.isDesktopNativeResolution()
    );
  }

  ngOnInit(): void {
    this.handleChangeTemplateService();
    // this.templateService.handleInit();
    // this.templateService.handleChangeIonHeaderClass('hidden md:hidden');
    this.fetchAllSaldo();
  }

  async fetchAllSaldo() {
    this.errorMsg = '';
    this.errorMsgToken = '';
    const token: string = await this.storageService.getStorage(
      StorageKeyEnum.TOKEN_SALDO
    );
    const payload = {
      token,
    };
    this.store.dispatch(GetSaldo({ payload }));
    this.setTitleStatus();
  }

  setTitleStatus = () => {
    let returnText: string = '';
    const month: number = Number(this.saldoForm.get('month')?.value);
    const year: string =
      this.saldoForm.get('year')?.value || new Date().getFullYear();
    if (month) {
      returnText = `${this.monthOptions[month - 1].label}  ${year}`;
    } else {
      returnText = `${year}`;
    }
    this.monthYear = returnText;
  };

  fetchMonthlySaldo = async () => {
    this.errorMsg = '';
    this.errorMsgToken = '';
    const token: string = await this.storageService.getStorage(
      StorageKeyEnum.TOKEN_SALDO
    );
    this.store.dispatch(GetSaldoReset({ response: {} }));
    this.setTitleStatus();
    const payload = {
      token: token,
      year: this.saldoForm.get('year')?.value,
      month: this.saldoForm.get('month')?.value,
    };
    await this.store.dispatch(getMonthlySaldo({ payload }));
  };

  initYearOptions() {
    const current = new Date().getFullYear();
    const twoYearsAgo = new Date().getFullYear() - 2;
    for (let i = twoYearsAgo; i <= current; i++) {
      this.yearOptions.push({ id: i, label: i.toString() });
    }
  }

  initForm(): void {
    this.saldoForm = new FormGroup({
      periode: new FormControl(null, Validators.required),
      year: new FormControl(new Date().getFullYear()),
      month: new FormControl(new Date().getMonth() + 1),
    });
  }

  public dateChange(val: string) {
    if (!val) return;
    const month = val?.split?.(' ')[0];
    const year = val.split(' ')[1];
    this.saldoForm.get('month')?.setValue(month);
    this.saldoForm.get('year')?.setValue(year);
  }

  public cariPeriode() {
    this.fetchMonthlySaldo();
  }
}
