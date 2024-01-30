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
  CreatePin,
  CreatePinDto,
  NoPesertaData,
  PinFormController,
} from '@controllers/auth';
import { Store } from '@ngrx/store';
import { InteractionState, InteractionType } from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { Observable, Subscription, combineLatest, take, tap } from 'rxjs';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-auth-pin-container',
  templateUrl: './pin.container.html',
  styleUrls: ['./pin.container.scss'],
  providers: [PinFormController, AuthRepository, AuthInteractionRepository],
})
export class AuthPinContainer implements OnInit, OnDestroy, OnChanges {
  private interactionSubs = new Subscription();
  private subscribtions = new Subscription();

  public referralCode!: string;
  public isError: any = null;

  @Input() public isOpenModal!: boolean | null;
  public isModalVisible!: boolean | null;

  @Output() public backClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() public closeClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output() public completed: EventEmitter<NoPesertaData> =
    new EventEmitter<NoPesertaData>();

  public formGroup!: FormGroup;
  public interactRes$: Observable<InteractionState>;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleSetContainer();
  }

  @Output() public clicked: EventEmitter<NoPesertaData> =
    new EventEmitter<NoPesertaData>();

  constructor(
    private store: Store,
    private authRepo: AuthRepository,
    private authInteractRepo: AuthInteractionRepository,
    formController: PinFormController,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,

    private cdr: ChangeDetectorRef
  ) {
    this.formGroup = formController.create();
    this.interactRes$ = this.authInteractRepo.getCreatePinInteraction$();
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
            this.isError = false;
            this.completed.emit();
          }

          if (interaction.type === InteractionType.FAILED) {
            this.isError = true;
          }
          this.cdr.markForCheck();
        })
      )
      .subscribe();

    this.subscribtions.add(interaction);
  }

  public handleUseReferral() {
    const response = combineLatest([
      this.authRepo.getLogin$(),
      this.authRepo.getVerifyOtp$(),
    ])
      .pipe(
        take(1),
        tap(([resLogin, resOtp]) => {
          const idProfileDpa =
            resLogin?.data?.idProfilDpa || resOtp?.data?.idProfilDpa;

          const payload: CreatePinDto = {
            ...this.formGroup.value,
            // idProfilDpa: idProfileDpa,
          };

          this.store.dispatch(CreatePin({ payload }));
        })
      )
      .subscribe();
    this.interactionSubs.add(response);
  }

  public async handleClose() {
    this.closeClicked.emit();
  }

  public async handleBack() {
    this.backClicked.emit();
  }

  public async handleSubmit() {
    this.clicked.emit();
  }
}
