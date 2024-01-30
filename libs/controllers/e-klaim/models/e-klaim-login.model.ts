import { Model } from '@shared';

export class EklaimLoginModel extends Model<EklaimLoginModel> {
  public email: string | null | undefined;
  public password: string | null | undefined;
}
