import { Model } from '@shared';

export class FriendList extends Model<FriendList> {
  public idAccount: string | undefined | null;
  public idProfilDpa: string | undefined | null;
  public photo: string | undefined | null;
  public namaPeserta: string | undefined | null;
  public statusPeserta: string | undefined | null;
  public namaPerusahaan: string | undefined | null;
}
