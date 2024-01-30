import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { SaldoData } from '../../models/saldo.model';

export const GetSaldoFailed = createAction(
  'Services.Menu.Events.GetSaldoFailed',
  props<{ response: DataResponse<SaldoData> }>()
);

export const GetSaldoFailedActionReducer = on(
  GetSaldoFailed,
  (state: any, {}) => {
    return {
      ...state,
      saldo: {},
    };
  }
);

export const GetSaldoFailedInteractionActionReducer = on(
  GetSaldoFailed,
  (state: any, { response }) => {
    return {
      ...state,
      saldo: {
        ...state?.saldo,
        main: {
          // ...state?.saldo?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
