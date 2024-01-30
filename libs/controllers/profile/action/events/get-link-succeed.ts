import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { LinkData } from '../../models/link';

export const GetLinkSucceed = createAction(
  'Services.Auth.Events.GetLinkSucceed',
  props<{ response: DataResponse<LinkData> }>()
);

export const GetLinkSucceedActionReducer = on(
  GetLinkSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      link: {
        ...state?.link,
        main: {
          ...state?.link?.main,
          ...response,
        },
      },
    };
  }
);

export const GetLinkSucceedInteractionActionReducer = on(
  GetLinkSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      link: {
        ...state?.link,
        main: {
          ...state?.link?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
