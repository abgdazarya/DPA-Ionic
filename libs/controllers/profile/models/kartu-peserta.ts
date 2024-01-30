import { decryptContentClass } from '@shared';
import { Transform } from 'class-transformer';

export class KartuPesertaData {
  idProfilDpa: string | null | undefined;
  idAccountDpa: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  namaPeserta: string | null | undefined;
  dtMulaiKerja: string | null | undefined;
  dtPeserta: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  tanggalLahir: string | null | undefined;
  noPeserta: string | null | undefined;
}
