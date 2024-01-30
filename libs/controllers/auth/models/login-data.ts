import { Model } from '@shared';

class Account extends Model<Account> {
  public idAccount: string | null | undefined;
}

export class LoginData extends Model<LoginData> {
  public account: Account[] | null | undefined;
  public idProfilDpa: string | null | undefined;
  public pin: number | null | undefined;
  public referal: number | null | undefined;
  public token: string | null | undefined;
  public refreshToken?: string | null | undefined;
  public timestamp?: string | null | undefined;
}
