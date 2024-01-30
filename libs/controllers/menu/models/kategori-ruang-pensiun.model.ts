import { Model } from '@shared';

export class KategoriRuangPensiun extends Model<KategoriRuangPensiun> {
  public idKategori: string | undefined | null;
  public judulKategori: string | undefined | null;
  public flagJudul: number | undefined | null;
  public flagDeskripsi: number | undefined | null;
  public flagHargaBarang: number | undefined | null;
  public flagPinMaps: number | undefined | null;
  public flagGambarJualBeli: number | undefined | null;
  public flagGambar: number | undefined | null;
  public flagLinkPenjualan: number | undefined | null;
  public flagActive: number | undefined | null;
  public createdOn: string | undefined | null;
}
