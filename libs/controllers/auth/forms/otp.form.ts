import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { sameAs } from '@shared';

@Injectable({ providedIn: 'root' })
class OtpFormRule {
  public get error(): any {
    return {};
  }

  public getFormGroup(): FormGroup {
    return new FormGroup({
      otp: new FormControl(null),
    });
  }
}

export class OtpFormController {
  public create(): any {
    return new OtpFormRule().getFormGroup();
  }
}
