import { createAction, on, props } from '@ngrx/store';
import {
  DataResponse,
  DataResponsePagination,
  InteractionType,
  dataComparable,
} from '@shared';
import { NotificationData } from '../../models/notification';

export const NotificationSucceed = createAction(
  'Services.Profile.Events.GetNotificationSucceed',
  props<{
    response: DataResponsePagination<NotificationData>;
    dataType: 'header' | 'list';
    append?: boolean;
  }>()
);

const extractData = (
  current: DataResponsePagination<NotificationData>,
  newest: DataResponsePagination<NotificationData>
): DataResponsePagination<NotificationData> => {
  if (newest?.data?.data) {
    if (current?.data?.data) {
      const dataNew: NotificationData[] = dataComparable(
        current.data.data,
        newest?.data?.data,
        'idNotif'
      );
      current = {
        ...newest,
        data: {
          ...newest.data,
          ...dataNew,
        },
      };
    } else {
      newest = {
        ...newest,
        data: {
          ...newest.data,
        },
      };
      current = newest;
    }
  }
  return current;
};

export const NotificationSucceedActionReducer = on(
  NotificationSucceed,
  (state: any, { response, dataType, append }) => {
    if (append) {
      const newData = response?.data?.data?.length
        ? [
            ...state?.notification?.[dataType]?.data?.data,
            ...response?.data?.data,
          ]
        : state?.notification?.[dataType]?.data?.data;

      return {
        ...state,
        notification: {
          ...state.notification,
          [dataType]: {
            ...state?.notification?.[dataType],
            data: {
              ...state?.notification?.[dataType]?.data,
              data: newData,
            },
          },
        },
      };
    }

    return {
      ...state,
      notification: {
        ...state.notification,
        [dataType]: {
          ...state?.notification?.[dataType],
          ...response,
          // ...extractData(state?.notification?.[dataType], response),
        },
      },
    };
  }
);

export const NotificationSucceedInteractionActionReducer = on(
  NotificationSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      notification: {
        ...state.notification,
        [dataType]: {
          ...state?.[dataType],
          error: response?.message,
          success: null,
          type: InteractionType.PROCESS,
          isLoading: false,
        },
      },
    };
  }
);
