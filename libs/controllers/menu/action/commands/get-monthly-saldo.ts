import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { MonthlySaldoDto } from '../../dtos/saldo.dto';

export const getMonthlySaldo = createAction(
  'Services.Menu.Commands.getMonthlySaldo',
  props<{ payload: MonthlySaldoDto; async?: boolean }>()
);

export const getMonthlySaldoReset = createAction(
  'Services.Menu.Commands.getMonthlySaldoReset',
  props<{ response: any; async?: boolean }>()
);

export const getMonthlySaldoInteractionReset = createAction(
  'Services.Menu.Commands.getMonthlySaldoInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const getMonthlySaldoActionReducer = on(getMonthlySaldo, (state: any, {}) => {
  return {
    ...state,
  };
});

export const getMonthlySaldoActionResetReducer = on(
  getMonthlySaldoReset,
  (state: any, { response }) => {
    return {
      ...state,
      saldo: {
        ...state?.saldo,
        main: {
          ...state?.saldo?.main,
          ...response,
        },
      },
    };
  }
);

export const getMonthlySaldoInteractionActionReducer = on(
  getMonthlySaldo,
  (state: any, {}) => {
    return {
      ...state,
      saldo: {
        ...state?.saldo,
        main: {
          ...state?.saldo?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const getMonthlySaldoInteractionActionResetReducer = on(
  getMonthlySaldoInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      saldo: {
        ...state?.saldo,
        main: {
          ...state?.saldo?.main,
          ...response,
        },
      },
    };
  }
);
