import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginPattern } from '@shared';

@Injectable({ providedIn: 'root' })
class LoginFormRule {
  public get error(): any {
    return {
      username: {
        required: (params: any) => 'No Hp/Email wajib diisi',
      },
    };
  }

  public getFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl(null, [Validators.required, loginPattern()]),
    });
  }
}

export class LoginFormController {
  public create(): any {
    return new LoginFormRule().getFormGroup();
  }
}
