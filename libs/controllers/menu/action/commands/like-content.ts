import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const LikeContent = createAction(
  'Services.Auth.Commands.LikeContent',
  props<{
    payload: any;
    async?: boolean;
    dataType: 'jualBeliRuangPensiun' | 'postinganRuangPensiun';
  }>()
);

export const LikeContentReset = createAction(
  'Services.Auth.Commands.LikeContentReset',
  props<{
    response: any;
    async?: boolean;
    dataType: 'jualBeliRuangPensiun' | 'postinganRuangPensiun';
  }>()
);

export const LikeContentInteractionReset = createAction(
  'Services.Auth.Commands.LikeContentInteractionReset',
  props<{
    response: any;
    async?: boolean;
    dataType: 'jualBeliRuangPensiun' | 'postinganRuangPensiun';
  }>()
);

export const LikeContentActionReducer = on(LikeContent, (state: any) => {
  return {
    ...state,
  };
});

export const LikeContentActionResetReducer = on(
  LikeContentReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        manage: {
          ...state?.[dataType]?.manage,
          ...response,
        },
      },
    };
  }
);

export const LikeContentInteractionActionReducer = on(
  LikeContent,
  (state: any, { dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        manage: {
          ...state?.[dataType]?.manage,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const LikeContentInteractionActionResetReducer = on(
  LikeContentInteractionReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        manage: {
          ...state?.[dataType]?.manage,
          ...response,
        },
      },
    };
  }
);
