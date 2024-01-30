import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { SaldoData } from '../../models/saldo.model';

export const GetSaldoSucceed = createAction(
  'Services.Menu.Events.GetSaldoSucceed',
  props<{
    response: DataResponse<SaldoData>
  }>()
);

export const GetSaldoSucceedActionReducer = on(
  GetSaldoSucceed,
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

export const GetSaldoSucceedInteractionActionReducer = on(
  GetSaldoSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      saldo: {
        ...state?.saldo,
        main: {
          ...state?.saldo?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
