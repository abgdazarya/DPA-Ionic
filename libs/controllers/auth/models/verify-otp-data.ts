import { Model } from '@shared';

class Account extends Model<Account> {
  public idAccount: string | null | undefined;
}

export class VerifyOtpData extends Model<VerifyOtpData> {
  public idProfilDpa: string | undefined | null;
  public token: string | undefined | null;
  public pin: number | undefined | null;
  public referral: number | undefined | null;
  public account: Account[] | null | undefined;
  public logic: string | undefined | null;
  public refreshToken?: string | undefined | null;
  public timestamp?: string | undefined | null;
}
