import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const DeleteProfil = createAction(
  'Services.Auth.Commands.DeleteProfil',
  props<{ payload?: any; async?: boolean }>()
);

export const DeleteProfilReset = createAction(
  'Services.Auth.Commands.DeleteProfilReset',
  props<{ response: any; async?: boolean }>()
);

export const DeleteProfilInteractionReset = createAction(
  'Services.Auth.Commands.DeleteProfilInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const DeleteProfilActionReducer = on(DeleteProfil, (state: any) => {
  return {
    ...state,
  };
});

export const DeleteProfilActionResetReducer = on(
  DeleteProfilReset,
  (state: any, { response }) => {
    return {
      ...state,
      deleteProfil: {
        ...state?.deleteProfil,
        main: {
          ...state?.deleteProfil?.main,
          ...response,
        },
      },
    };
  }
);

export const DeleteProfilInteractionActionReducer = on(
  DeleteProfil,
  (state: any) => {
    return {
      ...state,
      deleteProfil: {
        ...state?.deleteProfil,
        main: {
          ...state?.deleteProfil?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const DeleteProfilInteractionActionResetReducer = on(
  DeleteProfilInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      deleteProfil: {
        ...state?.deleteProfil,
        main: {
          ...state?.deleteProfil?.main,
          ...response,
        },
      },
    };
  }
);
