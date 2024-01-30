import { INITIAL_STATE, createAction, on, props } from '@ngrx/store';
import { INITIAL_INTERACTION_STATE, InteractionType } from '@shared';
import { ProfileDto } from '../../dtos/profile.dto';

export const EditProfile = createAction(
  'Services.Auth.Commands.EditProfile',
  props<{ payload: ProfileDto; async?: boolean }>()
);

export const EditProfileReset = createAction(
  'Services.Auth.Commands.EditProfileReset',
  props<{ response: any; async?: boolean }>()
);

export const EditProfileInteractionReset = createAction(
  'Services.Auth.Commands.EditProfileInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const EditProfileActionReducer = on(EditProfile, (state: any) => {
  return {
    ...state,
  };
});

export const EditProfileActionResetReducer = on(
  EditProfileReset,
  (state: any, { response }) => {
    return {
      ...state,
      editProfile: {
        // ...state?.editProfile,
        // main: {
        //   ...INITIAL_INTERACTION_STATE,
        //   ...INITIAL_STATE,
        // },

        ...INITIAL_STATE,
      },
    };
  }
);

export const EditProfileInteractionActionReducer = on(
  EditProfile,
  (state: any) => {
    return {
      ...state,
      editProfile: {
        ...state?.editProfile,
        main: {
          ...state?.editProfile?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const EditProfileInteractionActionResetReducer = on(
  EditProfileInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      editProfile: {
        ...INITIAL_INTERACTION_STATE,
        main: {
          ...INITIAL_INTERACTION_STATE,
        },
      },
    };
  }
);
