import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  NoPesertaData,
  ReferralCodeFormController,
  VerifyReferralCode,
} from '@controllers/auth';
import { Store } from '@ngrx/store';
import { InteractionState, InteractionType } from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { VerifyReferralCodeDto } from 'libs/controllers/auth/dtos/verify-referral-code.dto';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { Observable, Subscription, combineLatest, take, tap } from 'rxjs';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-auth-referral-code-container',
  templateUrl: './referral-code.container.html',
  styleUrls: ['./referral-code.container.scss'],
  providers: [
    ReferralCodeFormController,
    AuthRepository,
    AuthInteractionRepository,
  ],
})
export class AuthReferralCodeContainer implements OnInit, OnDestroy, OnChanges {
  private interactionSubs = new Subscription();
  private subscribtions = new Subscription();

  public isError: any = null;
  public isSkip: boolean = false;

  @Input() public isOpenModal!: boolean | null;
  public isModalVisible!: boolean | null;

  public formGroup!: FormGroup;
  public interactRes$: Observable<InteractionState>;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleSetContainer();
  }

  @Output() public clicked: EventEmitter<NoPesertaData> =
    new EventEmitter<NoPesertaData>();

  @Output() public backClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() public closeClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() public completed: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private store: Store,
    private authRepo: AuthRepository,
    private authInteractRepo: AuthInteractionRepository,
    formController: ReferralCodeFormController,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,

    private cdr: ChangeDetectorRef
  ) {
    this.formGroup = formController.create();
    this.interactRes$ =
      this.authInteractRepo.getVerifyReferralCodeInteraction$();
  }

  private handleSetContainer() {
    this.isModalVisible = this.screenSizeService.isMobileNativeResolution()
      ? false
      : true;

    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.interactionSubs.unsubscribe();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.handleSetContainer();
    }, 0);
    this.handleInitalizeInteraction();
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }

  handleInitalizeInteraction(): void {
    const interaction = this.interactRes$
      .pipe(
        tap((interaction: InteractionState) => {
          if (interaction.type === InteractionType.PROCESS) {
            this.isError = null;
          }
          if (interaction.type === InteractionType.SUCCEED) {
            if (this.isSkip) {
              this.isError = null;
              setTimeout(() => {
                this.handleSubmit();
              }, 1000);
            } else {
              this.isError = false;
            }
          }

          if (interaction.type === InteractionType.FAILED) {
            this.isError = true;
          }
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);
  }

  public handleUseReferral(skip: boolean = false) {
    const response = combineLatest([
      this.authRepo.getLogin$(),
      this.authRepo.getVerifyOtp$(),
    ])
      .pipe(
        take(1),
        tap(([resLogin, resOtp]) => {
          const idProfileDpa =
            resLogin?.data?.idProfilDpa || resOtp?.data?.idProfilDpa;

          if (!idProfileDpa) return;

          this.isSkip = skip;

          // if (skip) {
          //   this.formGroup.controls['kodeReferal'].setValue('SKIP');
          //   this.formGroup.updateValueAndValidity();
          // }

          if (skip) {
            const payload: VerifyReferralCodeDto = {
              // idProfilDpa: idProfileDpa,
              kodeReferal: 'SKIP',
            };

            this.store.dispatch(VerifyReferralCode({ payload }));
          } else {
            const payload: VerifyReferralCodeDto = {
              // idProfilDpa: idProfileDpa,
              ...this.formGroup.value,
            };

            this.store.dispatch(VerifyReferralCode({ payload }));
          }
        })
      )
      .subscribe();
    this.interactionSubs.add(response);
  }

  public async handleClose() {
    this.closeClicked.emit();
    // await this.modalCtrl.dismiss();
  }

  public async handleBack() {
    this.backClicked.emit();
    // await this.modalCtrl.dismiss({ back: true });
  }

  public async handleSubmit() {
    this.templateService.handleChangeIonHeaderClass('md:hidden');
    this.isOpenModal = false;
    this.completed.emit();
  }
}
