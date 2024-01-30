import { Model } from '@shared';

export class UserInfo extends Model<UserInfo> {
  namaPeserta: string | undefined | null;
  noHp: string | undefined | null;
  email: string | undefined | null;
  statusVerify: string | undefined | null;
}
