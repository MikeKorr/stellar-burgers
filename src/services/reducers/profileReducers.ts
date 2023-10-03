import {
  GET_PROFILE_INFO,
  PATCH_PROFILE_INFO,
  TUnionActions,
  TPayloadProfile,
} from "../actions/route-actions";

type TProfileState = TPayloadProfile;

export const profileState: TProfileState = {
  success: false,
  user: {
    email: "",
    name: "",
  },
};

export const profileReducer = (
  state = profileState,
  action: TUnionActions
): TProfileState => {
  switch (action.type) {
    case GET_PROFILE_INFO: {
      return {
        ...state,
        success: action.payload.success,
        user: action.payload.user,
      };
    }
    case PATCH_PROFILE_INFO: {
      return {
        ...state,
        success: action.payload.success,
        user: action.payload.user,
      };
    }
    default: {
      return state;
    }
  }
};
