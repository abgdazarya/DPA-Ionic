import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { LinkDto } from '../../dtos/link.dto';

export const GetLink = createAction(
  'Services.Auth.Commands.GetLink',
  props<{ payload: LinkDto; async?: boolean }>()
);

export const GetLinkReset = createAction(
  'Services.Auth.Commands.GetLinkReset',
  props<{ response: any; async?: boolean }>()
);

export const GetLinkInteractionReset = createAction(
  'Services.Auth.Commands.GetLinkInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetLinkActionReducer = on(GetLink, (state: any) => {
  return {
    ...state,
  };
});

export const GetLinkActionResetReducer = on(
  GetLinkReset,
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

export const GetLinkInteractionActionReducer = on(GetLink, (state: any) => {
  return {
    ...state,
    link: {
      ...state?.link,
      main: {
        ...state?.link?.main,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    },
  };
});

export const GetLinkInteractionActionResetReducer = on(
  GetLinkInteractionReset,
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
