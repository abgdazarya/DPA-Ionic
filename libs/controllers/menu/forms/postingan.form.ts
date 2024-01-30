import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
class PostinganFormRule {
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
      deskripsi: new FormControl(null, [Validators.required]),
      gambar: new FormBuilder().array([new FormBuilder().control(null)]),
      kategori: new FormControl({ value: null, disabled: true }, [Validators.required]),
    });
  }
}

export class PostinganFormController {
  public create(): any {
    return new PostinganFormRule().getFormGroup();
  }
}
