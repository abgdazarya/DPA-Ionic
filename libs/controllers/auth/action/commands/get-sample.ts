import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetSample = createAction(
  'Services.Auth.Commands.GetSample',
  props<{ async?: boolean }>()
);

export const GetSampleActionReducer = on(GetSample, (state: any) => {
  return {
    ...state,
  };
});

export const GetSampleInteractionActionReducer = on(GetSample, (state: any) => {
  return {
    ...state,
    createPin: {
      ...state?.createPin,
      type: InteractionType.PROCESS,
      isLoading: true,
    },
  };
});
