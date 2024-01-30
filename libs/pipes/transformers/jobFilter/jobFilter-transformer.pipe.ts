import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobFilterTransformer'
})
export class JobFilterTransformerPipe implements PipeTransform {

  transform(jobs: any[], jobFlag: string): any[] {
    return jobs.filter(job => job.jobFlag === jobFlag);
  }

}
