import { Model } from '@shared';

export class TrackModel extends Model<TrackModel> {
  public isMobile: string | null | undefined;
  public KdPeserta: string | null | undefined;
  public Password: string | null | undefined;
}
