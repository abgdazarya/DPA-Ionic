import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { GetTokenByIdProfilDto } from '../../dtos/get-token-by-id-profil';

export const GetTokenByIdProfil = createAction(
  'Services.Auth.Commands.GetTokenByIdProfil',
  props<{ payload: GetTokenByIdProfilDto; async?: boolean }>()
);

export const GetTokenByIdProfilReset = createAction(
  'Services.Auth.Commands.GetTokenByIdProfilReset',
  props<{ response: any; async?: boolean }>()
);

export const GetTokenByIdProfilInteractionReset = createAction(
  'Services.Auth.Commands.GetTokenByIdProfilInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetTokenByIdProfilActionReducer = on(
  GetTokenByIdProfil,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetTokenByIdProfilActionResetReducer = on(
  GetTokenByIdProfilReset,
  (state: any, { response }) => {
    return {
      ...state,
      login: {
        ...state?.login,
        main: {
          ...state?.login?.main,
          ...response,
        },
      },
    };
  }
);

export const GetTokenByIdProfilInteractionActionReducer = on(
  GetTokenByIdProfil,
  (state: any) => {
    return {
      ...state,
      login: {
        ...state?.login,
        main: {
          ...state?.login?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetTokenByIdProfilInteractionActionResetReducer = on(
  GetTokenByIdProfilInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      login: {
        ...state?.login,
        main: {
          ...state?.login?.main,
          ...response,
        },
      },
    };
  }
);
