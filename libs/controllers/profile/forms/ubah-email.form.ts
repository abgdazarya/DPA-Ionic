import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
class UbahEmailFormRule {
  public get error(): any {
    return {
      email: {
        required: (params: any) => 'email wajib diisi',
        email: (params: any) => 'format email tidak sesuai',
      },
    };
  }

  public getFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi
        ),
      ]),
    });
  }
}

export class UbahEmailFormController {
  public create(): any {
    return new UbahEmailFormRule().getFormGroup();
  }
}
