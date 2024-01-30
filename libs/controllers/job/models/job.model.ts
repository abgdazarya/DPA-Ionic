import { Model } from '@shared';

export class JobModel extends Model<JobModel> {
  public idJob: string | undefined | null;
  public posisi: string | undefined | null;
  public company: string | undefined | null;
  public locationPlacement: string | undefined | null;
  public jobDescription: string | undefined | null;
  public jobQualification: string | undefined | null;
  public linkJobPostJobqcCom: string | undefined | null;
  public iconPerusahaan: string | undefined | null;
  public linkWebCareer: string | undefined | null;
  public createdOn: string | undefined | null;
}
