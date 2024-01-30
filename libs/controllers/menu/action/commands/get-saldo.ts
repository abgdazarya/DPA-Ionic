import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { SaldoDto } from '../../dtos/saldo.dto';

export const GetSaldo = createAction(
  'Services.Menu.Commands.GetSaldo',
  props<{ payload: SaldoDto; async?: boolean }>()
);

export const GetSaldoReset = createAction(
  'Services.Menu.Commands.GetSaldoReset',
  props<{ response: any; async?: boolean }>()
);

export const GetSaldoInteractionReset = createAction(
  'Services.Menu.Commands.GetSaldoInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetSaldoActionReducer = on(GetSaldo, (state: any, {}) => {
  return {
    ...state,
  };
});

export const GetSaldoActionResetReducer = on(
  GetSaldoReset,
  (state: any, { response }) => {
    return {
      ...state,
      saldo: {
        main: {
          ...response,
        },
      },
    };
  }
);

export const GetSaldoInteractionActionReducer = on(
  GetSaldo,
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

export const GetSaldoInteractionActionResetReducer = on(
  GetSaldoInteractionReset,
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
