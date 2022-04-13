import {
  CREATE_MESSAGE,
  CLOSE_MESSAGE_MODAL,
  CLOSE_MESSAGE_MODAL_ACCEPT,
} from "../types";

const initialState = {
  isMessage: false,
  isAccepted: false,
  errorMessage: "",
  title: "",
  messageRow1: "",
  messageRow2: "",
  buttonText: "",
  buttonColor: "",
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MESSAGE:
      if (action.payload.secondButtonText) {
        return {
          ...state,
          isMessage: true,
          isAccepted: false,
          errorMessage: action.payload.errorMessage,
          title: action.payload.title,
          messageRow1: action.payload.messageRow1,
          messageRow2: action.payload.messageRow2,
          buttonText: action.payload.buttonText,
          buttonColor: action.payload.buttonColor,
          secondButtonText: action.payload.secondButtonText,
          secondButtonColor: action.payload.secondButtonColor,
        };
      } else {
        return {
          ...state,
          isMessage: true,
          isAccepted: false,
          errorMessage: action.payload.errorMessage,
          title: action.payload.title,
          messageRow1: action.payload.messageRow1,
          messageRow2: action.payload.messageRow2,
          buttonText: action.payload.buttonText,
          buttonColor: action.payload.buttonColor,
        };
      }

    case CLOSE_MESSAGE_MODAL: {
      return {
        ...initialState,
      };
    }
    case CLOSE_MESSAGE_MODAL_ACCEPT: {
      return {
        ...initialState,
        isAccepted: !state.isAccepted,
      };
    }
    default:
      return state;
  }
};

export default messageReducer;
