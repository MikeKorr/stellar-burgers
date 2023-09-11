import { GET_PROFILE_INFO, PATCH_PROFILE_INFO } from "../actions/route-actions";

const profileState = {
  done: false,
  user: {
    email: "",
    name: "",
  },
};

export const profileReducer = (state = profileState, action) => {
  switch (action.type) {
    case GET_PROFILE_INFO: {
      return {
        ...state,
        done: action.payload.done,
        user: action.payload.user,
      };
    }
    case PATCH_PROFILE_INFO: {
      return {
        ...state,
        done: action.payload.done,
        user: action.payload.user,
      };
    }
    default: {
      return state;
    }
  }
};
