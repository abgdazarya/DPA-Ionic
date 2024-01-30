import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accordionTitleTransformer'
})
export class AccordionTitleTransformerPipe implements PipeTransform {

  transform(value: any[] | null | undefined, args: string): string[] {
    return value?.map(val => (val[args])) || [];
  }

}
