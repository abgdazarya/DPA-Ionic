import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

class PromoFormRule {
  public get error(): any {
    return {
      // namaKerabat: {
      //   required: (params: any) => 'Nama kerabat wajib diisi',
      // },
      // hubunganKerabat: {
      //   required: (params: any) => 'Hubungan kerabat wajib diisi',
      // },
      // noHpKerabat: {
      //   required: (params: any) => 'Nomor HP kerabat wajib diisi',
      // },
    };
  }

  public getFormGroup(): FormGroup {
    return new FormGroup({
      idPromosi: new FormControl(null, [Validators.required]),
      idProfilDpa: new FormControl(null, [Validators.required]),
      namaPeserta: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi
        ),
      ]),
      noHp: new FormControl(null, [
        Validators.required,
        Validators.maxLength(13),
        Validators.pattern('[0-9]*'),
        Validators.minLength(8),
        Validators.pattern(/^(08([0-9]{8})|62([0-9]{8}))/),
      ]),
      perusahaan: new FormControl(null, []),
      kodePromosi: new FormControl(null, []),
    });
  }
}

@Injectable({ providedIn: 'root' })
export class PromoFormRuleController {
  public create(): any {
    return new PromoFormRule().getFormGroup();
  }
}
