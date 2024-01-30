import { Model } from '@shared';

export class News extends Model<News> {
  public idBeritaDpa: string | undefined | null;
  public judulBerita: string | undefined | null;
  public kategori: string | undefined | null;
  public headlineBerita: string | undefined | null;
  public isiBerita: string | undefined | null;
  public picture: string | undefined | null;
  public tag: string | undefined | null;
  public tanggalPost: string | undefined | null;
  public waktuPost: string | undefined | null;
}
