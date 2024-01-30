import { Model, decryptContent, decryptContentClass } from '@shared';
import { Transform } from 'class-transformer';

export class NoPesertaData extends Model<NoPesertaData> {
  public noPeserta: string | null | undefined;
  public idAccount: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  public namaPeserta: string | null | undefined;
  public statusPeserta: string | null | undefined;
  @Transform((value) => decryptContentClass(value))
  public umur: number | null | undefined;
  @Transform((value) => decryptContentClass(value))
  public gaji: number | null | undefined;
  @Transform((value) => decryptContentClass(value))
  public masaKerja: number | null | undefined;
  public namaPerusahaan: string | null | undefined;

  public get namaPesertaDecrypted(): string | null | undefined {
    if (this.namaPeserta) {
      return decryptContent(this.namaPeserta);
    }
    return null;
  }
}
