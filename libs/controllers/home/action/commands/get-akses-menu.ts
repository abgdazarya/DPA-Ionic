import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetAksesMenu = createAction(
  'Services.Home.Commands.GetAksesMenu',
  props<{ payload: any; async?: boolean }>()
);

export const GetAksesMenuReset = createAction(
  'Services.Home.Commands.GetAksesMenuReset',
  props<{ response: any; async?: boolean }>()
);

export const GetAksesMenuInteractionReset = createAction(
  'Services.Home.Commands.GetAksesMenuInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetAksesMenuActionReducer = on(GetAksesMenu, (state: any) => {
  return {
    ...state,
  };
});

export const GetAksesMenuActionResetReducer = on(
  GetAksesMenuReset,
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

export const GetAksesMenuInteractionActionReducer = on(
  GetAksesMenu,
  (state: any) => {
    return {
      ...state,
      aksesMenu: {
        ...state?.aksesMenu,
        main: {
          ...state?.aksesMenu?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetAksesMenuInteractionActionResetReducer = on(
  GetAksesMenuInteractionReset,
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
