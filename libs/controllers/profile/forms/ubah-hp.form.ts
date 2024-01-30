import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
class UbahHpFormRule {
  public get error(): any {
    return {
      hp: {
        required: (params: any) => 'HP wajib diisi',
        maxLength: (params: any) => 'Nomor ponsel melebihi batas',
      },
    };
  }

  public getFormGroup(): FormGroup {
    return new FormGroup({
      hp: new FormControl(null, [
        Validators.required,
        Validators.maxLength(13),
        Validators.pattern('[0-9]*'),
        Validators.minLength(8),
        Validators.pattern(/^(08([0-9]{8})|62([0-9]{8}))/)
      ]),
    });
  }
}

export class UbahHpFormController {
  public create(): any {
    return new UbahHpFormRule().getFormGroup();
  }
}
