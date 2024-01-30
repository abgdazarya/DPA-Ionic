import { Model } from '@shared';

export class AjukanModel extends Model<AjukanModel> {
  public isMobile: string | null | undefined;
  public KdPeserta: string | null | undefined;
  public Password: string | null | undefined;
  public Token: string | null | undefined;
  public ID_PROFILE_DPA: string | null | undefined;
}
