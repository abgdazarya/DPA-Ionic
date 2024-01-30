import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { LinkData } from '../../models/link';

export const GetLinkFailed = createAction(
  'Services.Auth.Events.GetLinkFailed',
  props<{ response: DataResponse<LinkData> }>()
);

export const GetLinkFailedActionReducer = on(GetLinkFailed, (state: any) => {
  return {
    ...state,
  };
});

export const GetLinkFailedInteractionActionReducer = on(
  GetLinkFailed,
  (state: any, { response }) => {
    return {
      ...state,
      link: {
        ...state?.link,
        main: {
          ...state?.link?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
