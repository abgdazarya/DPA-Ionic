import { Model } from '@shared';

export class RefreshTokenData extends Model<RefreshTokenData> {
  public token: string | undefined | null;
  public refreshToken?: string | undefined | null;
  public timestamp?: string | undefined | null;
}
