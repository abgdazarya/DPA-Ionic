import { Model } from '@shared';

export class AstramagazineModel extends Model<AstramagazineModel> {
  idMagazineArticle: string | null | undefined;
  judulKonten: string | null | undefined;
  JenisKonten: string | null | undefined;
  idKategoriAstramagz: string | null | undefined;
  namaKategoriAstramagazine: string | null | undefined;
  gambar: string | null | undefined;
  pdf: string | null | undefined;
  monthEdt: any;
  yearEdt: any;
  dateCreated: string | null | undefined;
}
