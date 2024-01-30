import { Model } from '@shared';

export class Sample extends Model<Sample> {
  public idNotif: string | null | undefined;
  public idProfilDpa: string | null | undefined;
  public kategori: string | null | undefined;
  public dtNotif: string | null | undefined;
  public judulNotif: string | null | undefined;
  public contentNotif: string | null | undefined;
  public link: string | null | undefined;
  public flagRead: number | null | undefined;
}
