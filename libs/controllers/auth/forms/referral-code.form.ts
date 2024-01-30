import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { sameAs } from '@shared';

@Injectable({ providedIn: 'root' })
class ReferralCodeFormRule {
  public get error(): any {
    return {};
  }

  public getFormGroup(): FormGroup {
    return new FormGroup({
      kodeReferal: new FormControl(null),
    });
  }
}

export class ReferralCodeFormController {
  public create(): any {
    return new ReferralCodeFormRule().getFormGroup();
  }
}
