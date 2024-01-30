import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { sameAs } from '@shared';

@Injectable({ providedIn: 'root' })
class PinFormRule {
  public get error(): any {
    return {
      pin: {
        required: (params: any) => 'Pin wajib diisi',
      },
      verifyPin: {
        required: (params: any) => 'Pin wajib diisi',
      },
    };
  }

  public getFormGroup(): FormGroup {
    return new FormGroup({
      pin: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      verifyPin: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        sameAs('pin'),
      ]),
      idProfilDpa: new FormControl(null),
    });
  }
}

export class PinFormController {
  public create(): any {
    return new PinFormRule().getFormGroup();
  }
}
