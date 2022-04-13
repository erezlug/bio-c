import { SET_LINK_TO, SET_URL_HISTORY } from "../types";

const initialState = {
  afterSurveyLink: "/",
  surveyId: "",
  urlHistory: false,
};

const linkToReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LINK_TO:
      return {
        afterSurveyLink: action.payload.afterSurveyLink,
        surveyId: action.payload.surveyId,
      };
    case SET_URL_HISTORY:
      return {
        ...state,
        urlHistory: action.payload.urlHistory,
      };

    default:
      return state;
  }
};

export default linkToReducer;
