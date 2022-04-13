import { CHANGE_LANGUAGE_HEBREW, CHANGE_LANGUAGE_ENGLISH } from "../types";
import { textContentEnglish } from "../../components/Localization/language/english/navbar";
import { textContentHebrew } from "../../components/Localization/language/hebrew/navbar";

const initialState = {
  ...textContentEnglish,
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE_HEBREW:
      return {
        ...textContentHebrew,
      };
    case CHANGE_LANGUAGE_ENGLISH:
      return {
        ...textContentEnglish,
      };
    default:
      return state;
  }
};

export default languageReducer;
