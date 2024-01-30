import { NoPesertaData } from '@controllers/auth';
import { decryptContent, decryptContentClass } from '@shared';
import { Transform } from 'class-transformer';

export class BaseProfile {
  @Transform((value) => decryptContentClass(value))
  namaPeserta: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  noHp: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  email: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  statusVerify: string | null | undefined;
  custConcern: string | null | undefined;
  noPeserta: NoPesertaData[] | null | undefined;

  public get namaPesertaDecrypted(): string | null | undefined {
    if (this.namaPeserta) {
      return decryptContent(this.namaPeserta);
    }
    return null;
  }
}

export interface IdCardInfo {
  src?: string | undefined | null;
  name?: string | undefined | null;
  type?: string | undefined | null;
}

export class DetailProfile extends BaseProfile {
  @Transform((value) => decryptContentClass(value))
  idProfilDpa: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  tanggalLahir: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  tempatLahir: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  jenisKelamin: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  nik: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  statusPerkawinan: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  alamat: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  rt: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  rw: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  kelurahanDesa: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  kecamatan: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  kotaKabupaten: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  provinsi: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  namaKerabat: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  hubunganKerabat: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  noHpKerabat: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  photo: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  googleAccount: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  appleId: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  biometricToggle: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  notificationToggle: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  idCardInfo?: IdCardInfo;
  idKelurahanDesa?: string | null | undefined;
  idKecamatan?: string | null | undefined;
  idKotaKabupaten?: string | null | undefined;
  idProvinsi?: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  fotoKtp?: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  flagNik?: number | null | undefined;
}
