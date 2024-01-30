import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { SetTokenFcmDto } from '../../dtos/set-token-fcm.dto';

export const SetTokenFcm = createAction(
  'Services.Profile.Commands.SetTokenFcm',
  props<{ payload: SetTokenFcmDto; async?: boolean }>()
);

export const SetTokenFcmActionReducer = on(SetTokenFcm, (state: any) => {
  return {
    ...state,
  };
});

export const SetTokenFcmInteractionActionReducer = on(SetTokenFcm, (state: any) => {
  return {
    ...state,
   setTokenFcm: {
      ...state?.setTokenFcm,
      type: InteractionType.PROCESS,
      isLoading: true,
    },
  };
});
