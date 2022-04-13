import { CREATE_MESSAGE } from "../types";
import {
  TOGGLE_RECORDING,
  START_RECORDING,
  STOP_RECORDING,
  GET_STREAM_INFO,
  CREATE_CONTAINER,
  START_RECOG,
  STOP_RECOG,
  RECOG_STATE,
  FAILED_UPLOAD,
  SUCCESSFUL_UPLOAD,
  RESET_ATTEMPTS,
  SRV_START_VID_STOP,
  SET_VISUALIZER
} from "../types";

export const toggleRecording = (isRecording) => (dispatch) => {
  dispatch({ type: TOGGLE_RECORDING, payload: !isRecording });
};

export const startRecording = () => (dispatch) => {
  dispatch({ type: START_RECORDING, payload: {} });
};

export const stopRecording = (SurveyPageNo, surveyQuestionName) => (
  dispatch
) => {
  let surveyQuestionDetails = {
    SurveyPageNo: SurveyPageNo,
    surveyQuestionName: surveyQuestionName,
  };
  dispatch({ type: STOP_RECORDING, payload: surveyQuestionDetails });
};
export const startRecog = () => (dispatch) => {
  dispatch({ type: START_RECOG, payload: {} });
};

export const stopRecog = () => (dispatch) => {
  dispatch({ type: STOP_RECOG, payload: {} });
};

export const recogState = (bool) => (dispatch) => {
  dispatch({ type: RECOG_STATE, payload: bool });
};

export const setStreaming = (bool) => (dispatch) => {
  dispatch({ type: GET_STREAM_INFO, payload: bool });
};

export const setVisualizer = (bool) => (dispatch)=> {
  dispatch({ type: SET_VISUALIZER, payload: bool });
}

export const cleanup = (recordingId, backend) => async (dispatch) => {
  const getFiles = await fetch(
    `${backend}/api/getFileIdsByRecordingId/${recordingId}`,
    {
      headers: {
        "Content-Type": "application/json",
        // 'authorization': 'Bearer ' + token
      },

      method: "GET",
    }
  );
  const files = await getFiles.json();
  if (files.recordings) {
    const fileIds = [...files.recordings];
    for (const fileId of fileIds) {
      console.log("removing");
      const delFiles = await fetch(`${backend}/api2/removeVideo/${fileId}`, {
        headers: {
          "Content-Type": "application/json",
          // 'authorization': 'Bearer ' + token
        },

        method: "POST",
      });
    }
    const delContainer = await fetch(
      `${backend}/api/deleteRecordingContainer/${recordingId}`,
      {
        headers: {
          "Content-Type": "application/json",
          // 'authorization': 'Bearer ' + token
        },

        method: "POST",
      }
    );
  }
};

//
//
//NADAV CHECK HERE
//
//
// export const createRecordingContainer = (surveyId,backend) => async (dispatch) => {
//   //let token = JSON.parse(sessionStorage.getItem('userData')).token;
//   try {
//     const response = await fetch(
//       `${backend}/api/createRecordingContainer`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           // 'authorization': 'Bearer ' + token
//         },

//         method: "POST",

//         body: JSON.stringify({ surveyId }),
//       }
//     );

//     const createNewContainerResponse = await response.json();

//     if (response.status === 201) {
//       dispatch({
//         type: CREATE_CONTAINER,
//         payload: createNewContainerResponse.recordingId,
//       });
//       return createNewContainerResponse.recordingId;
//     } else {
//       let messageContent = {
//         errorMessage: createNewContainerResponse.message,
//         title: "Failed to save to DB",
//         buttonText: "Try again",
//       };

//       dispatch({ type: CREATE_MESSAGE, payload: messageContent });
//       return null;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
export const resetAttempts = () => (dispatch) => {
  dispatch({ type: RESET_ATTEMPTS, payload: {} });
};
export const sendRecording = (
  blob,
  recordingId,
  surveyQuestionDetails,
  backend,
  user
) => async (dispatch) => {
  let currentUserData = {
    userId: user
  };

  //Creating FormData for the blob file
  let exten;
  switch (blob.type) {
    case "audio/webm":
    case "audio/weba":
      exten = ".weba"
      break;
    case "video/mkv":
      exten = ".mkv"
    case "video/mp4":
      exten = ".mp4"
    case "video/webm":
    default:
      exten = ".webm"
      break;
  }
  let filename =
    currentUserData.userId +
    Date.now() +
    "page" +
    surveyQuestionDetails.SurveyPageNo +
    "_" +
    surveyQuestionDetails.surveyQuestionName +
    exten;
  filename.replace(/\s/g, '');
  var recData = new FormData();
  recData.append("file", blob, filename);
  recData.append("userId", currentUserData.userId);
  // recData.append('user', currentUserData);
  recData.append("recordingId", recordingId);
  recData.append(
    "surveyQuestionDetails",
    JSON.stringify(surveyQuestionDetails)
  );
  let max=5
  for(let i=1;i<=max;i++){
  try {
    const response = await fetch(`${backend}/api2/uploadVideo`, {
      headers: {
        // authorization: "Bearer " + currentUserData.token,
      },

      method: "POST",

      body: recData,
    });
    const pushRecordingResponse = await response.json();
    if (response.status !== 201) {
      if(i===max){
        dispatch({ type: FAILED_UPLOAD, payload: {} });
      }
      console.log(`sending failed ${max-i} attempts remaining`);
      console.log(pushRecordingResponse.message);
      continue;
    } else {
      dispatch({ type: SUCCESSFUL_UPLOAD, payload: {} });
      console.log(`sending succeeded on attempt ${i}`);
      break;
    }
  } catch (error) {
    if(i===max){
      dispatch({ type: FAILED_UPLOAD, payload: {} });
    }
    console.log(`sending failed ${max-i} attempts remaining`);
    console.log(error);
    continue;
  }
}
  // return;
};
export const webcamDisable = () => (dispatch) => {
  dispatch({ type: SRV_START_VID_STOP, payload: {} });
};
