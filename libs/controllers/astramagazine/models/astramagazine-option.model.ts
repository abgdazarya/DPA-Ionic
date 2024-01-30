import { Model } from '@shared';

export class AstramagazineOptionKategoriModel extends Model<AstramagazineOptionModel> {
  idKategoriAstramagz: string | undefined | null;
  namaKategoriAstramagazine: string | undefined | null;
}

export class AstramagazineOptionModel extends Model<AstramagazineOptionModel> {
  kategori: AstramagazineOptionKategoriModel[] | undefined | null;
  month: number[] | undefined | null;
  year: number[] | undefined | null;
}
