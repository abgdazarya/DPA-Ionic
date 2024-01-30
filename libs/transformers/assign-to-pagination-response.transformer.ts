import { convertEntries, DataResponsePagination } from '@shared';
import { plainToInstance } from 'class-transformer';
import { map, Observable, pipe, UnaryFunction } from 'rxjs';

export function assignToPaginationResponse<T>(model: {
  new (): T;
}): UnaryFunction<Observable<any>, Observable<DataResponsePagination<T>>> {
  return pipe(
    map((response: any) => {
      const res = convertEntries(response);

      // if (res?.data?.data?.data && Array.isArray(res?.data?.data?.data)) {
      //   return {
      //     ...res?.data,
      //     data: {
      //       pagination: res.data.pagination,
      //       data: plainToInstance(model, res?.data?.data?.data),
      //     },
      //   };
      // }

      // if (!res?.data?.data?.data && res.status >= 200 && res.status <= 299) {
      //   return {
      //     ...res?.data,
      //     data: null,
      //   };
      // }

      if (res?.data?.data && Array.isArray(res?.data?.data)) {
        return {
          ...res,
          data: {
            pagination: res.pagination,
            data: plainToInstance(model, res?.data?.data),
          },
        };
      }

      if (res.status == true || res.status == false) {
        return {
          ...res,
          data: null,
        };
      }

      throw { error: res?.data };
    })
  );
}
