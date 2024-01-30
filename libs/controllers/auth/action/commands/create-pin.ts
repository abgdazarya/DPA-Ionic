import { createAction, on, props } from '@ngrx/store';
import { CreatePinDto } from '../../dtos/create-pin.dto';
import { InteractionType } from '@shared';

export const CreatePin = createAction(
  'Services.Auth.Commands.CreatePin',
  props<{ payload: CreatePinDto; async?: boolean }>()
);

export const CreatePinReset = createAction(
  'Services.Auth.Commands.CreatePinReset',
  props<{ response: any; async?: boolean }>()
);

export const CreatePinInteractionReset = createAction(
  'Services.Auth.Commands.CreatePinInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const CreatePinActionReducer = on(CreatePin, (state: any) => {
  return {
    ...state,
  };
});

export const CreatePinActionResetReducer = on(
  CreatePinReset,
  (state: any, { response }) => {
    return {
      ...state,
      createPin: {
        ...state?.createPin,
        main: {
          ...state?.createPin?.main,
          ...response,
        },
      },
    };
  }
);

export const CreatePinInteractionActionReducer = on(CreatePin, (state: any) => {
  return {
    ...state,
    createPin: {
      ...state?.createPin,
      main: {
        ...state?.createPin?.main,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    },
  };
});

export const CreatePinInteractionActionResetReducer = on(
  CreatePinInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      createPin: {
        ...state?.createPin,
        main: {
          ...state?.createPin?.main,
          ...response,
        },
      },
    };
  }
);
