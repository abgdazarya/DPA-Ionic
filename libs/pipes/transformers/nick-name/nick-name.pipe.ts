import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nickName',
})
export class NickNamePipe implements PipeTransform {
  transform(value: string | null | undefined, ...args: unknown[]): string {
    const transformNick = value
      ?.split(' ')
      .map((val, index, arrVal) =>
        index === 0 || index === arrVal.length - 1 ? val.charAt(0) : ''
      )
      .filter((val) => val !== '');
    return `${transformNick ? transformNick?.join('') : '-'}`;
  }
}
