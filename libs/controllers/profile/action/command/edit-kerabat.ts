import { INITIAL_STATE, createAction, on, props } from '@ngrx/store';
import { INITIAL_INTERACTION_STATE, InteractionType } from '@shared';
import { KerabatDto } from '../../dtos/kerabat.dto';

export const EditKerabat = createAction(
  'Services.Auth.Commands.EditKerabat',
  props<{ payload: KerabatDto; async?: boolean }>()
);

export const EditKerabatReset = createAction(
  'Services.Auth.Commands.EditKerabatReset',
  props<{ response: any; async?: boolean }>()
);

export const EditKerabatInteractionReset = createAction(
  'Services.Auth.Commands.EditKerabatInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const EditKerabatActionReducer = on(EditKerabat, (state: any) => {
  return {
    ...state,
  };
});

export const EditKerabatActionResetReducer = on(
  EditKerabatReset,
  (state: any, { response }) => {
    return {
      ...state,
      editKerabat: {
        // ...state?.editKerabat,
        // main: {
        //   ...state?.editKerabat?.main,
        //   ...response,
        // },
        ...INITIAL_INTERACTION_STATE,
        ...INITIAL_STATE,
      },
    };
  }
);

export const EditKerabatInteractionActionReducer = on(
  EditKerabat,
  (state: any) => {
    return {
      ...state,
      editKerabat: {
        ...state?.editKerabat,
        main: {
          ...state?.editKerabat?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const EditKerabatInteractionActionResetReducer = on(
  EditKerabatInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      editKerabat: {
        ...state?.editKerabat,
        main: {
          ...state?.editKerabat?.main,
          ...response,
        },
      },
    };
  }
);
