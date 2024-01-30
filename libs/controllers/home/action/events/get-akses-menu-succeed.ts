import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { AksesMenuModel } from '../../models/akses-menu.model';

export const GetAksesMenuSucceed = createAction(
  'Services.Auth.Events.GetAksesMenuSucceed',
  props<{ response: DataResponse<AksesMenuModel> }>()
);

export const GetAksesMenuSucceedActionReducer = on(
  GetAksesMenuSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      aksesMenu: {
        ...state?.aksesMenu,
        main: {
          ...state?.aksesMenu?.main,
          ...response,
        },
      },
    };
  }
);

export const GetAksesMenuSucceedInteractionActionReducer = on(
  GetAksesMenuSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      aksesMenu: {
        ...state?.aksesMenu,
        main: {
          ...state?.aksesMenu?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
