import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RequestOtpInteractionReset } from '@controllers/auth';
import { IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  INITIAL_INTERACTION_STATE,
  InteractionState,
  InteractionType,
} from '@shared';
import { AuthInteractionRepository } from '@stores/auth';
import { HeaderSecondComponent } from 'libs/components/common/header-second/header-second.component';
import { TextInputComponent } from 'libs/components/common/text-input/text-input.component';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { Observable, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-forget-pin',
  templateUrl: './forget-pin.component.html',
  styleUrls: ['./forget-pin.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TextInputComponent,
    HeaderSecondComponent,
  ],
  providers: [AuthInteractionRepository],
})
export class ForgetPinComponent {
  @Input() continueForgetPin: any = undefined;
  @Input() inputValue: any = undefined;

  private subscribtions = new Subscription();

  pinForm!: FormGroup;
  public otpIsloading: Observable<boolean | undefined | null>;
  public requestOtpInteractRes$: Observable<InteractionState>;

  public isError: string | any = null;

  constructor(
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService,
    private authInteractRepo: AuthInteractionRepository,
    private store: Store
  ) {
    this.initForm();
    this.otpIsloading = this.authInteractRepo
      .getRequestOtpInteraction$()
      .pipe(map((res) => res.isLoading));
    this.requestOtpInteractRes$ =
      this.authInteractRepo.getRequestOtpInteraction$();
  }
  initForm() {
    this.isError = null;
    this.pinForm = new FormGroup({
      input: new FormControl(null, Validators.required),
    });

    const subs = this.pinForm.controls['input'].valueChanges.subscribe(
      (value) => {
        this.isError = null;
      }
    );

    this.subscribtions.add(subs);
  }
  async lanjut() {
    const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

    const value = this.pinForm.controls['input'].value;

    const type = regexExp.test(value) ? 'email' : 'phone';
    const data = {
      type,
      value,
    };
    if (this.continueForgetPin) {
      await this.store.dispatch(
        RequestOtpInteractionReset({ response: INITIAL_INTERACTION_STATE })
      );
      await this.continueForgetPin(data);
      const subs = await this.requestOtpInteractRes$.subscribe(
        (e: InteractionState) => {
          if (e.type == InteractionType.SUCCEED) {
            this.modalCtrl.dismiss(data);
          } else if (e.type == InteractionType.FAILED) {
            this.isError =
              e.error ||
              'Sepertinya terjadi kendala di server kami, silahkan hubungi teknisian kami!';
          }
        }
      );
      this.subscribtions.add(subs);
    } else {
      this.modalCtrl.dismiss(data);
    }
  }
  async onBack() {
    await this.modalCtrl.dismiss('back');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.inputValue) {
      this.pinForm.controls['input']?.setValue(this.inputValue || '');
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribtions.unsubscribe();
  }

  isReady = (status: any) => status;
}
