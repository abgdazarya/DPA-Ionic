import { Model } from '@shared';

export class ContentPromo extends Model<ContentPromo> {
  public idPromosi: string | undefined | null;
  public idKategoriPromosi: string | undefined | null;
  public namaKategori: string | undefined | null;
  public judul: string | undefined | null;
  public banner: string | undefined | null;
  public tanggalTayangFrom: string | undefined | null;
  public detailPromo: string | undefined | null;
  public spesifikasiPromo: string | undefined | null;
  public linkPromosi: string | undefined | null;
}
