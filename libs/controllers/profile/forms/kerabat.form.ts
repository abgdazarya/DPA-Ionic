import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
class KerabatFormRule {
  public get error(): any {
    return {
      namaKerabat: {
        required: (params: any) => 'Nama kerabat wajib diisi',
      },
      hubunganKerabat: {
        required: (params: any) => 'Hubungan kerabat wajib diisi',
      },
      hubunganKerabatLainnya: {
        required: (params: any) => 'Hubungan kerabat wajib diisi',
      },
      noHpKerabat: {
        required: (params: any) => 'Nomor HP kerabat wajib diisi',
      },
    };
  }

  public getFormGroup(): FormGroup {
    return new FormGroup({
      namaKerabat: new FormControl(null, [Validators.required]),
      hubunganKerabat: new FormControl(null, [Validators.required]),
      hubunganKerabatLainnya: new FormControl(null),
      noHpKerabat: new FormControl(null, [
        Validators.required,
        Validators.maxLength(13),
        Validators.minLength(8),
        Validators.pattern(/(08([0-9]{8})|62([0-9]{8}))/),
      ]),
    });
  }
}

export class KerabatFormController {
  public create(): any {
    return new KerabatFormRule().getFormGroup();
  }
}
