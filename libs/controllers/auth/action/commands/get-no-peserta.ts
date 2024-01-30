import { createAction, on, props } from '@ngrx/store';
import { GetNoPesertaDto } from '../../dtos/get-no-peserta.dto';
import { InteractionType } from '@shared';

export const GetNoPeserta = createAction(
  'Services.Auth.Commands.GetNoPeserta',
  props<{ payload: GetNoPesertaDto; async?: boolean }>()
);

export const GetNoPesertaReset = createAction(
  'Services.Auth.Commands.GetNoPesertaReset',
  props<{ response: any; async?: boolean }>()
);

export const GetNoPesertaInteractionReset = createAction(
  'Services.Auth.Commands.GetNoPesertaInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetNoPesertaActionReducer = on(GetNoPeserta, (state: any) => {
  return {
    ...state,
  };
});

export const GetNoPesertaActionResetReducer = on(
  GetNoPesertaReset,
  (state: any, { response }) => {
    return {
      ...state,
      noPeserta: {
        ...state?.noPeserta,
        main: {
          ...state?.noPeserta?.main,
          ...response,
        },
      },
    };
  }
);

export const GetNoPesertaInteractionActionReducer = on(
  GetNoPeserta,
  (state: any) => {
    return {
      ...state,
      noPeserta: {
        ...state?.noPeserta,
        main: {
          ...state?.noPeserta?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetNoPesertaInteractionActionResetReducer = on(
  GetNoPesertaInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      noPeserta: {
        ...state?.noPeserta,
        main: {
          ...state?.noPeserta?.main,
          ...response,
        },
      },
    };
  }
);
