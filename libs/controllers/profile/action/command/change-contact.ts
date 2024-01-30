import { INITIAL_STATE, createAction, on, props } from '@ngrx/store';
import { INITIAL_INTERACTION_STATE, InteractionType } from '@shared';
import { ChangeContactDto } from '../../dtos/change-contact.dto';

export const ChangeContact = createAction(
  'Services.Auth.Commands.ChangeContact',
  props<{ payload: ChangeContactDto; async?: boolean }>()
);

export const ChangeContactReset = createAction(
  'Services.Auth.Commands.ChangeContactReset',
  props<{ response: any; async?: boolean }>()
);

export const ChangeContactInteractionReset = createAction(
  'Services.Auth.Commands.ChangeContactInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const ChangeContactActionReducer = on(ChangeContact, (state: any) => {
  return {
    ...state,
  };
});

export const ChangeContactActionResetReducer = on(
  ChangeContactReset,
  (state: any, { response }) => {
    return {
      ...state,
      changeContact: {
        // ...state?.changeContact,
        // main: {
        //   ...state?.changeContact?.main,
        //   ...response,
        // },
        ...INITIAL_INTERACTION_STATE,
        ...INITIAL_STATE,
      },
    };
  }
);

export const ChangeContactInteractionActionReducer = on(
  ChangeContact,
  (state: any) => {
    return {
      ...state,
      changeContact: {
        ...state?.changeContact,
        main: {
          ...state?.changeContact?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const ChangeContactInteractionActionResetReducer = on(
  ChangeContactInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      changeContact: {
        // ...state?.changeContact,
        ...INITIAL_INTERACTION_STATE,
        main: {
          ...INITIAL_INTERACTION_STATE,
        },
      },
    };
  }
);
