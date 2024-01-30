import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetSaldo, SaldoData } from '@controllers/menu';

import { Store } from '@ngrx/store';
import { DataResponse, InteractionState, InteractionType } from '@shared';
import { MenuInteractionRepository, MenuRepository } from '@stores/menu';
import { SimulasiMpData } from 'libs/controllers/simulasi-mp/models/simulasi-mp.model';
import { SimulasiMpService } from 'libs/controllers/simulasi-mp/services/simulasi-mp.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable } from 'rxjs';
import { SimulasiService } from './simulasi.service';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-simulasi-mp',
  templateUrl: './simulasi-mp.page.html',
  styleUrls: ['./simulasi-mp.page.scss'],
  providers: [MenuRepository, MenuInteractionRepository, DatePipe],
})
export class SimulasiMpPage implements OnInit {
  simulasiForm!: FormGroup;
  showDetail: boolean | null = null;
  isSubmitting = false;
  isLoading = true;
  public response$: Observable<DataResponse<SaldoData> | undefined | null>;
  public interactionResponse$: Observable<InteractionState>;
  private token = '';
  saldoData: SaldoData | undefined | null;
  simulasiData: SimulasiMpData | undefined | null;
  public errorMsg: string | any = '';
  public errorMsgToken: string | any = '';
  constructor(
    private router: Router,
    private simulasiMpService: SimulasiMpService,
    private menuRepository: MenuRepository,
    private menuInteractionRepository: MenuInteractionRepository,
    private storageService: StorageService,
    private store: Store,
    private simulasiService: SimulasiService,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    private cdr: ChangeDetectorRef,
    private location: Location,
    private datePipe: DatePipe
  ) {
    this.initForm();
    this.response$ = this.menuRepository.getSaldo$();
    this.interactionResponse$ =
      this.menuInteractionRepository.getSaldoInteraction$();
    this.initThemplate();
    this.interactionResponse$.subscribe((res) => {
      if (res.type === InteractionType.FAILED) {
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

  ionViewWillEnter() {
    this.initToken();
  }

  initThemplate = () => {
    this.templateService.handleInit();
    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeIonContentClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'ion-background-white relative'
        : 'ion-background-white relative'
    );
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('Simulasi MP');
    this.templateService.handleUseSecondaryHeader(true);
    this.templateService.handleShowFooter(
      this.screenSizeService.isMobileResolution() ? false : true
    );
    this.templateService.handleOnBack(this.restorePos);
  };

  async ngOnInit(): Promise<void> {
    setTimeout(() => {
      this.initThemplate();
      this.cdr.markForCheck();
    }, 0);

    await this.fetchAllSaldo();
    this.initToken();
    this.response$.subscribe((res) => {
      if (res?.data) {
        this.saldoData = res?.data;
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });

    this.interactionResponse$.subscribe((res) => {
      if (res.type != InteractionType.PROCESS) {
        this.isLoading = false;
        this.cdr.markForCheck();
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

  async fetchAllSaldo() {
    this.errorMsg = '';
    this.errorMsgToken = '';
    const token: string = await this.storageService.getStorage(
      StorageKeyEnum.TOKEN_SALDO
    );
    const payload = {
      token,
    };

    await this.store.dispatch(GetSaldo({ payload }));
  }

  async initToken() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const payload = {
      idProfilDpa,
    };
    this.simulasiMpService.getTokenMP(payload).subscribe((data) => {
      this.token = data.data?.accessToken || '';
    });
    this.cdr.markForCheck();
  }

  initForm() {
    this.simulasiForm = new FormGroup({
      gaji: new FormControl('', Validators.required),
      kenaikan: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
        Validators.minLength(1),
      ]),
      pengembangan: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
        Validators.minLength(1),
      ]),
    });

    this.simulasiForm.statusChanges.subscribe((res) => {
      if (this.simulasiForm.get('gaji')?.value == 0) {
        this.simulasiForm.get('gaji')?.patchValue(null);
      }
      this.cdr.markForCheck();
    });
  }

  isInputFilled(): boolean {
    return (
      this.simulasiForm.get('gaji')?.value !== '' &&
      this.simulasiForm.get('gaji')?.value !== 0 &&
      this.simulasiForm.get('gaji')?.value !== null
    );
  }

  backToHome() {
    this.router
      .navigate(['/home'], { onSameUrlNavigation: 'reload' })
      .then(() => {
        this.location.replaceState('/home');
      });
  }

  simulasiError = '';
  async handleHitung() {
    if (this.token == '' || !this.token) {
      await this.initToken();
    }
    let gaji = this.simulasiForm.get('gaji')?.value;
    this.simulasiForm.get('gaji')?.setValue(gaji.toString());
    this.simulasiData = null;
    this.isSubmitting = true;
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const payload = {
      ...this.simulasiForm.getRawValue(),
      saldo: this.saldoData?.saldo || '',
      tanggalLahir:
        this.datePipe.transform(this.saldoData?.tanggalLahir, 'MM/dd/yyyy') ||
        '06/19/1964',
      tanggalBekerja:
        this.datePipe.transform(
          this.saldoData?.tanggalMulaiKerja,
          'MM/dd/yyyy'
        ) || '',
      dpa: this.saldoData?.dpa || '2',
      mpToken: this.token,
    };
    if (payload.dpa === '1') delete payload.saldo;

    this.showDetail = false;
    this.simulasiMpService.postSimulasiMP(payload).subscribe(
      (res: any) => {
        this.isSubmitting = false;
        res.data.totalMp = Math.floor(res.data?.totalMp);
        this.simulasiData = res.data;
        this.simulasiService.setData({
          ...res.data!,
          gaji: this.simulasiForm.get('gaji')?.value || 0,
          kenaikan: this.simulasiForm.get('kenaikan')?.value || 0,
          pengembangan: this.simulasiForm.get('pengembangan')?.value || 0,
        });
        if (this.screenSizeService.isMobileResolution()) {
          this.router.navigate(['simulasi-mp/detail']);
        }

        if (res?.type === InteractionType.FAILED)
          this.simulasiError = 'Tidak ada data.';
        setTimeout(() => {
          this.simulasiError = '';
          this.cdr.markForCheck();
        }, 3000);
        this.showDetail = Object.keys(res.data || {}).length ? true : false;
        this.cdr.markForCheck();
        return;
      },
      (err) => {
        this.simulasiError = 'Tidak ada data.';
        setTimeout(() => {
          this.simulasiError = '';
          this.cdr.markForCheck();
        }, 3000);
        this.isSubmitting = false;
        this.cdr.markForCheck();
        return;
      }
    );
  }

  public removeNaN = (value: any, status: string = 'uang') => {
    if (value?.match?.(/NaN/gi)) {
      return status == 'uang' ? 0 : 'Biodata Belum Lengkap';
    }
    return value;
  };
}
