import {
  CLOSE_MESSAGE_MODAL,
  CLOSE_MESSAGE_MODAL_ACCEPT,
  CREATE_MESSAGE,
} from "../types";

export const createMessage = (messageContent) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_MESSAGE, payload: messageContent });
  } catch (error) {
    console.log(error);
  }
};

export const closeModal = () => async (dispatch) => {
  try {
    dispatch({ type: CLOSE_MESSAGE_MODAL });
  } catch (error) {
    console.log(error);
  }
};

export const closeModalAccept = () => async (dispatch) => {
  try {
    dispatch({ type: CLOSE_MESSAGE_MODAL_ACCEPT });
  } catch (error) {
    console.log(error);
  }
};
