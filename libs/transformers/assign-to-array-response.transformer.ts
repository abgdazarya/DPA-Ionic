import { convertEntries, DataResponse } from '@shared';
import { plainToInstance } from 'class-transformer';
import { map, Observable, pipe, UnaryFunction } from 'rxjs';

export function assignToArrayResponse<T>(model: {
  new (): T;
}): UnaryFunction<Observable<any>, Observable<DataResponse<T[]>>> {
  return pipe(
    map((res: any) => {

      // if (res?.data?.data && Array.isArray(res?.data?.data)) {
      //   const mappingData = res?.data?.data.map((val: any) =>
      //     plainToInstance(model, convertEntries(val))
      //   );
      //   return {
      //     ...res?.data,
      //     data: mappingData,
      //   };
      // }

      // if (!res?.data?.data && res.status >= 200 && res.status <= 299) {
      //   return {
      //     ...res?.data,
      //     data: null,
      //   };
      // }

      if (res?.data && Array.isArray(res?.data)) {
        const mappingData = res?.data.map((val: any) =>
          plainToInstance(model, convertEntries(val))
        );
        return {
          ...res,
          data: mappingData,
        };
      }

      if (res.status == true || res.status == false ) {
        return {
          ...res?.data,
          data: null,
        };
      }

      throw { error: res?.data };
    })
  );
}
