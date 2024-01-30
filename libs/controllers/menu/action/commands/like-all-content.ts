import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const LikeAllContent = createAction(
  'Services.Auth.Commands.LikeAllContent',
  props<{
    payload: any;
    async?: boolean;
    dataType: 'jualBeliRuangPensiun' | 'postinganRuangPensiun';
  }>()
);

export const LikeAllContentReset = createAction(
  'Services.Auth.Commands.LikeAllContentReset',
  props<{
    response: any;
    async?: boolean;
    dataType: 'jualBeliRuangPensiun' | 'postinganRuangPensiun';
  }>()
);

export const LikeAllContentInteractionReset = createAction(
  'Services.Auth.Commands.LikeAllContentInteractionReset',
  props<{
    response: any;
    async?: boolean;
    dataType: 'jualBeliRuangPensiun' | 'postinganRuangPensiun';
  }>()
);

export const LikeAllContentActionReducer = on(LikeAllContent, (state: any) => {
  return {
    ...state,
  };
});

export const LikeAllContentActionResetReducer = on(
  LikeAllContentReset,
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

export const LikeAllContentInteractionActionReducer = on(
  LikeAllContent,
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

export const LikeAllContentInteractionActionResetReducer = on(
  LikeAllContentInteractionReset,
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
