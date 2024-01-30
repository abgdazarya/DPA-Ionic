import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
class JualBeliFormRule {
  public get error(): any {
    return {
      judulThread: {
        required: (params: any) => 'Judul wajib diisi',
      },
    };
  }

  public getFormGroup(): FormGroup {
    return new FormGroup({
      judulThread: new FormControl(null, [Validators.required]),
      hargaBarang: new FormControl(null, [Validators.required]),
      alamat: new FormControl(null, [Validators.required]),
      deskripsi: new FormControl(null, [Validators.required]),
      pinMaps: new FormControl(null, [Validators.required]),
      alamatPinMaps: new FormControl(''),
      linkPenjualan: new FormControl(null),
      // gambar: new FormControl(null, [Validators.required]),
      // gambar: new FormArray([
      //   new FormControl(null)
      // ]),
      // gambarJualBeli: new FormArray([
      //   new FormControl(null),
      //   new FormControl(null),
      //   new FormControl(null),
      //   new FormControl(null)
      // ], [Validators.required]),
      gambarJualBeli: new FormBuilder().array([new FormBuilder().control(null)]),
      kategori: new FormControl({ value: null, disabled: true }, [Validators.required]),
    });
  }
}

export class JualBeliFormController {
  public create(): any {
    return new JualBeliFormRule().getFormGroup();
  }
}
