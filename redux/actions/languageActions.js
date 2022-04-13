import { CHANGE_LANGUAGE_HEBREW, CHANGE_LANGUAGE_ENGLISH } from "../types";

export const changeLanguage = (language) => (dispatch) => {
  try {
    if (language === "english") {
      dispatch({ type: CHANGE_LANGUAGE_ENGLISH });
    } else {
      dispatch({ type: CHANGE_LANGUAGE_HEBREW });
    }
  } catch (error) {
    console.log(error);
  }
};
