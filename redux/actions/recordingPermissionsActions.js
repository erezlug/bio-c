import { CHANGE_RECORDINGS_PERMISSIONS } from "../types";

export const changeRecordingPermissions = (video, audio) => (dispatch) => {
  let permissions = {
    camera: video,
    microphone: audio,
  };
  
    dispatch({ type: CHANGE_RECORDINGS_PERMISSIONS, payload: permissions });

};
