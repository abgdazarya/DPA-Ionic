import { createAction, on, props } from '@ngrx/store';
import { MenuDto } from '../../dtos/menu.dto';
import { InteractionType } from '@shared';

export const GetListJob = createAction(
  'Services.Menu.Commands.GetListJob',
  props<{
    payload: MenuDto;
    dataType: 'landing' | 'list' | 'recommendation';
    async?: boolean;
  }>()
);

export const GetListJobReset = createAction(
  'Services.Menu.Commands.GetListJobReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'recommendation';
    async?: boolean;
  }>()
);

export const GetListJobInteractionReset = createAction(
  'Services.Menu.Commands.GetListJobInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'recommendation';
    async?: boolean;
  }>()
);

export const GetListJobActionReducer = on(
  GetListJob,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetListJobActionResetReducer = on(
  GetListJobReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      job: {
        ...state?.job,
        [dataType]: {
          ...state?.job?.[dataType],
          ...response,
          data: { data: [] },
        },
      },
    };
  }
);

export const GetListJobInteractionActionReducer = on(
  GetListJob,
  (state: any, { dataType }) => {
    return {
      ...state,
      job: {
        ...state?.job,
        [dataType]: {
          ...state?.job?.[dataType],
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetListJobInteractionActionResetReducer = on(
  GetListJobInteractionReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      job: {
        ...state?.job,
        [dataType]: {
          ...state?.job?.[dataType],
          ...response,
        },
      },
    };
  }
);
