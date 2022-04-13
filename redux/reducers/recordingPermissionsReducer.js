import { CHANGE_RECORDINGS_PERMISSIONS } from "../types";

const initialState = {
  camera: true,
  microphone: true,
};

const recordingPermissionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_RECORDINGS_PERMISSIONS:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};

export default recordingPermissionsReducer;
