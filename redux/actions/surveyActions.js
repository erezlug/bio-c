import { CREATE_MESSAGE, SET_LINK_TO } from "../types";
import { SAVE_NEW_SURVEY, UPDATE_SURVEY, SURVEY_COMPLETE } from "../types";
// jest.setup.js
import { setConfig } from "next/config";
import { publicRuntimeConfig } from "../../next.config";

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig({ publicRuntimeConfig });

// SAVE_SURVEY_RESULTS,

export const saveNewSurvey =
  (surveyName, JSON, backend) => async (dispatch) => {
    let currentUserData = JSON.parse(sessionStorage.getItem("userData"));

    let payloadObj = {
      userId: currentUserData.userId,
      surveyName: surveyName, //TODO
      JSON: { ...JSON },
    };
    console.log("SAVING");
    try {
      dispatch({ type: SAVE_NEW_SURVEY, payload: payloadObj });
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(`${backend}/api/SurveyCreate`, {
        method: "POST",
        body: JSON.stringify({
          userId: currentUserData.userId,
          surveyTitle: surveyName,
          JSON,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + currentUserData.token,
        },
      });

      const saveNewSurveyResponse = await response.json();

      if (response.status === 200 || response.status === 201) {
        let messageContent = {
          title: "Success",
          messageRow1: saveNewSurveyResponse.message,
          //messageRow2: saveNewSurveyResponse.surveyId,
          buttonText: "Close",
        };

        dispatch({ type: CREATE_MESSAGE, payload: messageContent });
        return saveNewSurveyResponse.surveyId;
      } else {
        let messageContent = {
          errorMessage: saveNewSurveyResponse.message,
          title: "Saving the survey failed, please try again",
          buttonText: "Try again",
        };
        dispatch({ type: CREATE_MESSAGE, payload: messageContent });
      }
    } catch (error) {
      console.log(error);
    }
  };
export const uncompleted = (recordingId) => async (dispatch) => {};
export const updateSurvey =
  (surveyId, surveyName, JSON, backend) => async (dispatch) => {
    let currentUserData = JSON.parse(sessionStorage.getItem("userData"));

    let payloadObj = {
      surveyId,
      surveyName, //TODO
      JSON: { ...JSON },
    };
    console.log("SAVING");
    try {
      dispatch({ type: UPDATE_SURVEY, payload: payloadObj });
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await fetch(`${backend}/api/SurveyUpdate`, {
        method: "POST",
        body: JSON.stringify({
          surveyId,
          surveyTitle: surveyName,
          JSON,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + currentUserData.token,
        },
      });

      const updateSurveyResponse = await response.json();

      if (response.status === 200 || response.status === 201) {
        window.localStorage.clear();
        let messageContent = {
          title: "Success",
          messageRow1: updateSurveyResponse.message,
          //messageRow2: saveNewSurveyResponse.surveyId,
          buttonText: "Close",
          buttonColor: "success",
        };

        dispatch({ type: CREATE_MESSAGE, payload: messageContent });
      } else {
        let messageContent = {
          errorMessage: updateSurveyResponse.message,
          title: "Failed to update to DB",
          buttonText: "Try again",
          buttonColor: "danger",
        };
        dispatch({ type: CREATE_MESSAGE, payload: messageContent });
      }
    } catch (error) {
      console.log(error);
    }
  };
// export const getSurveyById= async(surveyId) =>{
//   try {
//     const response = await fetch(`${backend}/api/getSurveyById/${surveyId}`, {
//       method: "GET",
//       headers: {
//         'Content-Type': 'application/json',
//         // authorization: "Bearer " + token,
//       },
//     });
//     const surveyResponse = await response.json();
//     if (response.status === 200 || response.status === 201) {
//       return surveyResponse;

//     }
//   } catch (error) {
//     console.log(error);
//     return false
//   }

// }

export const resetSurvey = () => async (dispatch) => {
  dispatch({ type: SURVEY_COMPLETE, payload: false });
};
export const saveSurveyResults =
  (
    userId,
    surveyResult,
    surveyId,
    surveyName,
    totalSurveyTime,
    individualPageTime,
    totalScore,
    recordingId,
    backend,
    scoreThreshold,
    useScoreThreshold,
    answerLog
  ) =>
  async (dispatch) => {
    console.log("redux");
    let user = userId ? { userId: userId } : undefined;
    let currentUserData = user || {
      userId: process.env.GUEST_USER_ID || "601ff01f4c6ba1877c97e411",
    };
    console.log("redirecting");
    try {
      const response = await fetch(`${backend}/api/TestYourself`, {
        method: "POST",
        body: JSON.stringify({
          userId: currentUserData.userId,
          surveyId: surveyId,
          surveyTitle: surveyName,
          results: { ...surveyResult },
          totalSurveyTime,
          individualPageTime,
          score: totalScore,
          recordingId,
          answerLog:answerLog,
        }),
        headers: {
          "Content-Type": "application/json",
          // authorization: "Bearer " + currentUserData.token,
        },
      });

      const saveSurveyResponse = await response.json();
      if (response.status === 200 || response.status === 201) {
        let messageContent = {
          title: "Congratulations!",
          messageRow1: saveSurveyResponse.message,
          messageRow2: "You will be redirected in a few seconds",
          buttonText: "Close",
          buttonColor: "primary",
          afterSurveyLink:
            (useScoreThreshold && (totalScore >= scoreThreshold)
              ? "/surveys/finishSurvey"
              : "/surveys/finishSurveySimple"),
          // afterSurveyLink: "/surveys/finishSurvey",
        };
        dispatch({
          type: SET_LINK_TO,
          payload: {
            afterSurveyLink: messageContent.afterSurveyLink,
            surveyId: saveSurveyResponse.resultId,
          },
        });

        // dispatch({ type: CREATE_MESSAGE, payload: messageContent });
      } else {
        let messageContent = {
          errorMessage: saveSurveyResponse.message,
          messageRow2: "You will be redirected in a few seconds",
          title: "Failed to save results",
          buttonText: "Try again",
        };
        // dispatch({ type: CREATE_MESSAGE, payload: messageContent });
      }
    } catch (error) {
      console.log(error);
    }

      dispatch({ type: SURVEY_COMPLETE, payload: true });

  };
