import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { MenuNewsInteractionState, MenuNewsState } from '@stores/menu-news';

export const SetReadNews = createAction(
  'Services.Menu.News.Commands.SetReadNews',
  props<{ payload: any; async?: boolean }>()
);

export const SetReadNewsReset = createAction(
  'Services.Menu.News.Commands.SetReadNewsReset',
  props<{ response: any; async?: boolean }>()
);

export const SetReadNewsInteractionReset = createAction(
  'Services.Menu.News.Commands.SetReadNewsInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const SetReadNewsActionReducer = on(
  SetReadNews,
  (state: MenuNewsState, {}) => {
    return {
      ...state,
    };
  }
);

export const SetReadNewsActionResetReducer = on(
  SetReadNewsReset,
  (state: MenuNewsState, { response }) => {
    return {
      ...state,
      manage: {
        ...state?.manage,
        ...response,
      },
    };
  }
);

export const SetReadNewsInteractionActionReducer = on(
  SetReadNews,
  (state: MenuNewsInteractionState, {}) => {
    return {
      ...state,
      manage: {
        ...state?.manage,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);

export const SetReadNewsInteractionActionResetReducer = on(
  SetReadNewsInteractionReset,
  (state: MenuNewsInteractionState, { response }) => {
    return {
      ...state,
      manage: {
        ...state?.manage,
        ...response,
      },
    };
  }
);
