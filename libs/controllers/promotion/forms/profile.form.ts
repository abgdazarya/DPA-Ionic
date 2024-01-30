import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
class ProfileFormRule {
  public get error(): any {
    return {
      nik: {
        required: (params: any) => 'NIK wajib diisi',
      },
      namaLengkap: {
        required: (params: any) => 'Nama lengkap wajib diisi',
      },
      tanggalLahir: {
        required: (params: any) => 'Tanggal lahir wajib diisi',
      },
      tempatLahir: {
        required: (params: any) => 'Tempat lahir wajib diisi',
      },
      status: {
        required: (params: any) => 'Status wajib diisi',
      },
      jenisKelamin: {
        required: (params: any) => 'Jenis Kelamin wajib diisi',
      },
      alamat: {
        required: (params: any) => 'Alamat wajib diisi',
      },
      rt: {
        required: (params: any) => 'RT wajib diisi',
      },
      rw: {
        required: (params: any) => 'RW wajib diisi',
      },
      provinsi: {
        required: (params: any) => 'provinsi wajib diisi',
      },
      kotaKabupaten: {
        required: (params: any) => 'Kota atau kabupaten wajib diisi',
      },
      kecamatan: {
        required: (params: any) => 'kecamatan wajib diisi',
      },
    };
  }

  public getFormGroup(): FormGroup {
    return new FormGroup({
      nik: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      namaLengkap: new FormControl(null, [Validators.required]),
      tanggalLahir: new FormControl(null, [Validators.required]),
      tempatLahir: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      jenisKelamin: new FormControl(null, [Validators.required]),
      alamat: new FormControl(null, [Validators.required]),
      rt: new FormControl(null, [Validators.required]),
      rw: new FormControl(null, [Validators.required]),
      provinsi: new FormControl(null, [Validators.required]),
      kotaKabupaten: new FormControl(null, [Validators.required]),
      kecamatan: new FormControl(null, [Validators.required]),
    });
  }
}

export class ProfileFormController {
  public create(): any {
    return new ProfileFormRule().getFormGroup();
  }
}
