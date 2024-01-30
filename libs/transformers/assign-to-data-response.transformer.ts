import { convertEntries, DataResponse } from '@shared';
import { plainToInstance } from 'class-transformer';
import { map, Observable, pipe, UnaryFunction } from 'rxjs';

export function assignToDataResponse<T>(
  model: {
    new (): T;
  },
  hard?: boolean
): UnaryFunction<Observable<any>, Observable<DataResponse<T>>> {
  return pipe(
    map((res: any) => {

      // if (res?.data?.data && !Array.isArray(res?.data?.data)) {
      //   return {
      //     ...res?.data,
      //     data: plainToInstance(model, convertEntries(res?.data?.data)),
      //   };
      // }

      // if (!res?.data?.data && res.status >= 200 && res.status <= 299) {
      //   return {
      //     ...res?.data,
      //     data: null,
      //   };
      // }

      if (res?.data && !Array.isArray(res?.data)) {
        return {
          ...res,
          data: plainToInstance(model, convertEntries(res?.data)),
        };
      }

      if (res.status == true || res.status == false) {
        return {
          ...res,
          data: null,
        };
      }

      throw {
        error: res?.data
      };
    })
  );
}
