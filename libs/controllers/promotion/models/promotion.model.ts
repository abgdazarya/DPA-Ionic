import {
  Model,
  camelToSnakeCase,
  convertEntries,
  snakeToCamelCase,
} from '@shared';

export class PromotionModel extends Model<PromotionModel> {
  public idPromosi: string | undefined | null;
  public idKategoriPromosi: string | undefined | null;
  public namaKategori: string | undefined | null;
  public judul: string | undefined | null;
  public banner: string | undefined | null;
  public tanggalTayangFrom: string | undefined | null;
  public detailPromo: string | undefined | null;
  public spesifikasiPromo: string | undefined | null;
  public linkPromosi: string | undefined | null;
  public namaPerusahaan: string | undefined | null;
  public perusahaanPenyelenggara: string | undefined | null;
  public hasPromo: boolean | undefined | null;

  public get banners(): any | undefined | null {
    if (!this.banner) return;
    let formattedBody: any = convertEntries(JSON.parse(this.banner));
    return formattedBody;
  }

  public get bannersUri(): any[] | undefined | null {
    if (!this.banner) return;
    let formattedBody: any = convertEntries(JSON.parse(this.banner));

    let array = [];
    for (const [key, value] of Object.entries(formattedBody)) {
      array.push(value);
    }

    return array || null;
  }
}
