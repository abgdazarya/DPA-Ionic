import { Model } from "@shared";

export class NotificationData extends Model<NotificationData>{
  idNotif: string | null | undefined;
  idProfilDpa: string | null | undefined;
  kategori: string | null | undefined;
  dtNotif: string | null | undefined;
  judulNotif: string | null | undefined;
  contentNotif: string | null | undefined;
  link: string | null | undefined;
  flagRead: number | null | undefined;
}
