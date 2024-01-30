import { Model } from '@shared';

export class LaporanInvestasiModel extends Model<LaporanInvestasiModel> {
  public idLaporanInvestasi: string | undefined | null;
  public judulLaporan: string | undefined | null;
  public jenisLaporanInvestasi: string | undefined | null;
  public text: string | undefined | null;
  public image: string | undefined | null;
  public imageThumbnail: string | undefined | null;
  public pdf: string | undefined | null;
}
