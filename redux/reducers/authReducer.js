import {
  LOGIN_SUCCESS,
  LOGOUT,
  SAVE_TOKEN,
  GET_PROFILE,
  GET_PROFILES,
  //ADD_ENV,
  UPDATE_USER_PROFILE,
} from "../types";

const initialState = {
  firstName: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...action.payload,
      };
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case LOGOUT:
      return {
        ...action.payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        ...action.payload,
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
      };
    // case ADD_ENV:
    //   return {
    //     ...state,
    //     myEnv: { backend:action.payload.backend, dashboardUrl:action.payload.dashboardUrl, momzSurveyId:action.payload.momzSurveyId },
    //   };
    case UPDATE_USER_PROFILE:
      console.log("reducer", action.payload);
      return { ...action.payload };

    default:
      return {...state};
  }
};

export default authReducer;
