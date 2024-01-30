import { decryptContentClass } from '@shared';
import { Transform } from 'class-transformer';

export class SaldoData {
  idProfilDpa: string | null | undefined;
  noPeserta: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  saldo: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  iuranTerakhir: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  iuranSukarela?: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  iuranSukarelaTerakhir?: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  hasilPengembangan: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  month?: string | null | undefined;
  year?: string | null | undefined;
  dpa?: string | null | undefined;
  tanggalMulaiKerja?: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  tanggalLahir?: string | null | undefined;
}
