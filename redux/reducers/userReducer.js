import {
  SAVE_SURVEY_RESULTS,
  SUBSCRIBE_TO_UPDATES,
  TOGGLE_RECORDING,
  CREATE_CONTAINER,
  START_RECORDING,
  STOP_RECORDING,
  SAVE_NEW_SURVEY,
  SEND_RECORDING,
  GET_STREAM_INFO,
  START_RECOG,
  STOP_RECOG,
  RECOG_STATE,
  SUCCESSFUL_UPLOAD,
  FAILED_UPLOAD,
  RESET_ATTEMPTS,
  SURVEY_COMPLETE,
  SRV_START_VID_STOP,
  SET_VISUALIZER,
} from "../types";

const initialState = {
  subscribe: {
    subscribeToUpdates: false,
    subscribeWithEmail: "",
  },
  isRecording: false,
  isStreaming: false,
  surveyQuestionDetails: {
    surveyName: "",
    SurveyPageNo: "",
    surveyQuestionName: "",
  },
  recordingId: null,
  isRecog: false,
  recogState: false,
  failedUploads: 0,
  successfulUploads: 0,
  surveyComplete: false,
  webcamStop: false,
  backend: process.env.NEXT_PUBLIC_REACT_APP_BACK_END,
  dashboardUrl: process.env.NEXT_PUBLIC_ADMIN_DASHBOARD,
  momzSurveyId: process.env.NEXT_PUBLIC_MOMZ_SURVEY_ID,
  visualizer: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_TO_UPDATES:
      return {
        ...state,
        subscribe: {
          subscribeToUpdates: action.payload.subscribeToUpdates,
          subscribeWithEmail: action.payload.subscribeWithEmail,
        },
      };
    case TOGGLE_RECORDING:
      return {
        ...state,
        isRecording: action.payload,
      };
    case START_RECORDING:
      return {
        ...state,
        isRecording: true,
      };
    case STOP_RECORDING:
      return {
        ...state,
        isRecording: false,
        surveyQuestionDetails: action.payload,

        // {
        //     surveyName:action.payload.surveyName,
        //     SurveyPageNo:action.payload.SurveyPageNo,
        //     surveyQuestionName:action.payload.surveyQuestionName
        // }
      };
    case SAVE_SURVEY_RESULTS:
      return {
        ...state,
        surveyResults: action.payload,
      };
    case SAVE_NEW_SURVEY:
      return {
        ...state,
        newSurvey: action.payload,
      };
    case SEND_RECORDING:
      return {
        ...state,
        blobs: [...state.blobs, action.payload],
      };
    case GET_STREAM_INFO:
      return {
        ...state,
        isStreaming: action.payload,
      };
    case CREATE_CONTAINER:
      return {
        ...state,
        recordingId: action.payload,
      };
    case START_RECOG:
      return {
        ...state,
        isRecog: true,
      };
    case STOP_RECOG:
      return {
        ...state,
        isRecog: false,
      };
    case RECOG_STATE:
      return {
        ...state,
        recogState: action.payload,
      };
    case FAILED_UPLOAD:
      return {
        ...state,
        failedUploads: state.failedUploads + 1,
      };
    case SUCCESSFUL_UPLOAD:
      return {
        ...state,
        successfulUploads: state.successfulUploads + 1,
      };
    case RESET_ATTEMPTS:
      return {
        ...state,
        failedUploads: 0,
        successfulUploads: 0,
        webcamStop: false,
      };
    case SURVEY_COMPLETE:
      return {
        ...state,
        surveyComplete: action.payload,
      };
    case SRV_START_VID_STOP:
      return {
        ...state,
        webcamStop: true,
      };
      case SET_VISUALIZER:
        return {
          ...state,
          visualizer: action.payload,
        };
    default:
      return state;
  }
};

export default userReducer;
