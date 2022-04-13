import React, { useState, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import helpCommands from '../Consts/commands.json'
import { useSelector, useDispatch } from 'react-redux';
import * as recordingActions from "../../redux/actions/recordingActions";
// jest.setup.js
import { setConfig } from 'next/config'
import { publicRuntimeConfig } from '../../next.config'
import { surveyLocalization } from "survey-react";
// Make sure you can use "publicRuntimeConfig" within tests.
setConfig({ publicRuntimeConfig })


const Dictaphone = ({ sendAns, commandArr, backend, sendCmnd}) => {
  //Recognized dictLanguage
  const language = useSelector(state => state.language.language)
  const [dictLanguage, setDictLanguage] = useState((language === "english" ? "en-Gb" : "he"));
  //A Check if the speech recognition is currently running
  const { listening } = useSpeechRecognition();
  const isRecog = useSelector(state => state.user.isRecog);
  const dispatch = useDispatch();
  //A call to start listening
  const handleStart = () => {
    SpeechRecognition.startListening({
      language: dictLanguage
    });
  }

  //what to run on voice commands
  const videoCommandCallback = (type,command) => {
    sendAns(type, command)
    resetTranscript();
  }
  const surveyCommandCallback = (command) => {
    sendCmnd(command)
    resetTranscript();
  }
  const mailAlert = (command) => {
    //dispatch(recordingActions.alertMail(command));
    fetch(`${backend}/api/sendAlertMail`, {

      headers: {

        'Content-Type': 'application/json',
        // 'authorization': 'Bearer ' + token
      },

      method: "POST",

      body:
        JSON.stringify({ command })

    });
    resetTranscript();
  }
  //voice commands command can be a string to regonize or an array of strings to recognize
  const commands = [
    // {
    //   command: ['clear', 'נקי'],
    //   callback: ({ resetTranscript }) => resetTranscript(),
    //   matchInterim: true
    // },
    {
      command: [...helpCommands.commands],
      callback: (command) => mailAlert(command),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.7,
      bestMatchOnly: true
    }, 
    {
      command: [surveyLocalization.getString('pageNextText'), surveyLocalization.getString('pagePrevText'), surveyLocalization.getString('completeText'), surveyLocalization.getString('startSurveyText')],
      callback: (command) => surveyCommandCallback(command),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.8,
      bestMatchOnly: true
    },
    // {
    //   command: surveyLocalization.getString('pagePrevText'),
    //   callback: () => back(),
    // },
    // {
    //   command: surveyLocalization.getString('completeText'),
    //   callback: () => complete(),
    // },
    // {
    //   command: surveyLocalization.getString('startSurveyText'),
    //   callback: () => start(),
    // },
    {
      command: [...commandArr],
      callback: (command) => videoCommandCallback("", command),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.7,
      bestMatchOnly: true
    },
    // {
    //   command: 'question :question ',
    //   callback: (command) => videoCommandCallback("", command),
    //   isFuzzyMatch: true,
    //   fuzzyMatchingThreshold: 0.7,
    //   bestMatchOnly: true
    // },
    // {
    //   command: [...commandArr],
    //   callback: (command) => videoCommandCallback("", command),
    //   isFuzzyMatch: true,
    //   fuzzyMatchingThreshold: 0.7,
    //   bestMatchOnly: true
    // }

  ]

  //The actual displayed transcript, won't be needed in final product, must be placed after commands to allow voice command clear
  const { transcript, resetTranscript } = useSpeechRecognition({ commands })
  //handle switching the recognized laguage
  useEffect(() => {
    resetTranscript();
    setDictLanguage((language === "english" ? "en-Gb" : "he"))
  }, [language, resetTranscript])
  useEffect(() => {
    if (isRecog && !listening) {
      SpeechRecognition.startListening({
        language: dictLanguage
      });
      // console.log(commands)
    }
    // else if(!isRecog && listening){
    //   SpeechRecognition.stopListening();
    //   console.log("Stopped")
    // }
  }, [isRecog, listening, dictLanguage])

  useEffect(() => {
    dispatch(recordingActions.recogState(listening));
  }, [listening, dispatch])

  //don't return if speech regonition is not supported
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log("We're sorry, speech recognition is not available on this browser");
    return null
  }

  return (
    <div hidden>

      <button onClick={resetTranscript}>Reset</button>
      <div className="row">
        {listening ? <button onClick={SpeechRecognition.stopListening}>Stop Dic</button> : <button onClick={handleStart}>Start Dic</button>}

      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="trans col-4">
          <span>dictLanguage: {dictLanguage}</span>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <span>{transcript}</span>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  )
}
export default Dictaphone