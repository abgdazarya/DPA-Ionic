import { Model } from '@shared';

export class RequestOtpData extends Model<RequestOtpData> {
  public idProfilDpa: string | null | undefined;
  public timestamp: Date | null | undefined;
  public timeExpired: Date | null | undefined;
  public flagCount: number | null | undefined;
}
