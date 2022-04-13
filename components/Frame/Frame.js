import React, { Component } from "react";
import Dictaphone from "./Dictaphone";
import { isMobile } from "react-device-detect";
// import Select from 'react-dropdown-select'

//css
import "survey-react/survey.css";
import "survey-react/modern.css";
// import "bootstrap/dist/css/bootstrap.css";
// import "./Frame.css";

// import surveyJson from "../Consts/surveyJSON.json"
// import surveyJson from "../Consts/testJSON.json"
import WebcamStreamCapture from "./WebcamStreamCapture";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import * as SurveyPDF from "survey-pdf";
//import for language support
import "../Localization/localization";
// import * as Survey from "survey-react";

//Redux imports
import { connect } from "react-redux";
import {
  toggleRecording,
  startRecording,
  stopRecording,
  webcamDisable,
  setVisualizer,
  cleanup,
} from "../../redux/actions/recordingActions";
// import { changeRecordingPermissions } from "../../redux/actions/recordingPermissionsActions";
import { saveSurveyResults } from "../../redux/actions/surveyActions";
import SurveyComplete from "../Common/survey-complete";
import { Survey, SurveyQuestionImagePicker } from "survey-react";

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledButton: false,
      userId: this.props.userId,
      anonUserId: this.props.anonUserId,
      //deprecated, was a toggle for a recording compontent
      record: false,
      // marginStyle: window? window.innerWidth <= 426 ? "" : "1rem 1rem" :null,
      //array of strings that match choices in survey, to be passed to Dictaphone to ccreate voice commands
      locale: this.props.localStrings.locale,
      options: this.renderSupportedLocales(),
      // window: {
      //   // survey: new Survey.Model(surveyJson) //**** THIS IS THE ORIGINAL LINE****/

      //   survey: new this.props.Survey.Model({
      //     ...this.props.survey,
      //     locale: this.props.localStrings.locale === "עברית" ? "he" : "",
      //   }), // Here we expect the Object for the survey.
      // },
      failedUploads: 0,
      successfulUploads: 0,
      uploadAttemps: 0,
      surveyTimes: {
        total: null,
        individual: [],
      },
      answerLog: [],
      temporaryFilesStorage: {},
      disableDefaultStartPage: this.props.survey.hasOwnProperty(
        "firstPageIsStarted"
      )
        ? this.props.survey.firstPageIsStarted
        : false,
      commands: [],
    };
    this.survey = new this.props.Survey.Model({
      ...this.props.survey,
      locale: this.state.locale,
    }); // Here we expect the Object for the survey.
    //add localization
  }

  //setState with promise, to allow program to wait for state to be set before performing action (useful for a double toggle) atm not in use
  // setAsyncState = (newState) => {
  //   new Promise((resolve) => this.setState(newState, resolve));
  // };
  //Testing custom promise to allow us to upload files before sending results
  myPromise = (num) =>
    new Promise(function (resolve, reject) {
      console.log(num);
      resolve(num * 10);
    });
  // setVal = (text) => {
  // surveyCleanup = () =>async function() {
  //   console.log("i am 2nd ")
  //   let recId=this.props.recordingId;
  //   let comp = survey.state;
  //   // console.log(this.props.recordingId)
  //   if(comp!=="completed"){
  //     console.log("i am 2nd again")
  //   await this.props.surveyCleanup(recId);
  //   }
  //   //this.props.surveyCleanup(this.props.recordingId);

  // }
  componentDidMount() {
    this.myPromise(5).then((ans) => {
      console.log(ans);
    });

    // let recId=this.props.recordingId;
    // let comp = survey.state;
    // let surveyCleanup = this.props.surveyCleanup;
    // let sClean = async function(event)  {
    //   if(comp!=="completed"){
    //   await surveyCleanup(recId)
    //   }
    // }
    // window.addEventListener('beforeunload', sClean);
    // Survey.StylesManager.applyTheme("darkblue");
    // Survey.JsonObject.metaData.addProperty("question", {
    //   name: "score:number",
    // });
    // Survey.JsonObject.metaData.addProperty("itemvalue", {
    //   name: "score:number",
    // });
    const mainColor = "#02AEEB";
    const mainHoverColor = "#02AEEB";
    const textColor = "#000000";
    const headerColor = "#FF318C";
    const headerBackgroundColor = "#FFFFFF00";
    const bodyContainerBackgroundColor = "#f8f8f8";
    var defaultThemeColorsSurvey =
      this.props.Survey.StylesManager.ThemeColors["default"];
    defaultThemeColorsSurvey["$main-color"] = mainColor;
    defaultThemeColorsSurvey["$main-hover-color"] = mainHoverColor;
    defaultThemeColorsSurvey["$text-color"] = textColor;
    defaultThemeColorsSurvey["$header-color"] = headerColor;
    defaultThemeColorsSurvey["$header-background-color"] =
      headerBackgroundColor;
    defaultThemeColorsSurvey["$body-container-background-color"] =
      bodyContainerBackgroundColor;
    defaultThemeColorsSurvey["$primary-color"] = mainColor;
    defaultThemeColorsSurvey["$secondary-color"] = mainColor;
    this.props.Survey.StylesManager.applyTheme();

    // Survey.Serializer.addProperty("question", {
    //   name: "score:number",
    // });

    // Survey.Serializer.addProperty("itemvalue", {
    //   name: "score:number",
    // });
    // console.log(this.props.Survey.Serializer.getProperties("itemvalue"));
  }
  componentWillUnmount() {
    // let recId=this.props.recordingId;
    // // let comp = survey.state;
    // let surveyCleanup = this.props.surveyCleanup;
    // let sClean = async function(event)  {
    //   // if(comp!=="completed"){
    //   await surveyCleanup(recId)
    //   //}
    // }
    // sClean();
    // if(survey.state!=="completed"){
    // console.log("cleaning");
    // this.props.surveyCleanup();
    //    }
    //this.props.surveyCleanup(this.props.recordingId);
    // let comp = survey.state;
    // if (comp !== "completed") {
    //   // navigator.sendBeacon(
    //   //   `http://localhost:5000/api/deleteRecordingContainer/${this.props.recordingId}`
    //   // );
    //   this.props.cleanup(this.props.recordingId, this.props.backend);
    // }
    this.props.setVisualizer(false);
  }

  addPageTime = (survey, page) => {
    let temp = this.state.surveyTimes;
    let currNo =
      survey.state !== "completed"
        ? survey.currentPageNo
        : survey.pageCount - 1;
    let curr = page;
    //survey.state!=="completed"? page:survey.pages[survey.pageCount-1];
    let obj = {
      //list page's non zero index
      pageNo: currNo + (survey.firstPageIsStarted ? 0 : 1),
      pageTime: curr.timeSpent,
    };
    //if this is the first time answering, it inserts element, if element follows last array element, array size will change. if user went back, just update
    temp.individual[currNo - (survey.firstPageIsStarted ? 1 : 0)] = obj;
    this.setState({ surveyTimes: temp });
  };
  chooseCtrl = (command) => {
    switch (command) {
      case this.survey.pageNextText:
        this.next();
        break;
      case this.survey.pagePrevText:
        this.back();
        break;
      case this.survey.completeText:
        this.complete();
        break;
      case this.survey.startSurveyText:
        this.start();
        break;
      default:
        break;
    }
  };
  signnFormat = (survey, options) => {
    if (options.question.getType() === "signaturepad") {
      options.question.dataFormat = { value: "image/jpeg", text: "JPEG" };
    }
  };
  start = () => {
    if (this.state.disableDefaultStartPage === true) {
      this.survey.start();
    } else {
      this.setState({ disableDefaultStartPage: true });
      this.started();
    }
  };
  next = () => {
    this.survey.nextPage();
  };
  changePage = (sender, option) => {
    if (
      this.survey.state !== "starting" &&
      this.state.disableDefaultStartPage === true
    ) {
      this.addPageTime(sender, option.oldCurrentPage);
      this.stopCapture(
        option.oldCurrentPage.visibleIndex + 1,
        option.oldCurrentPage.questions[0].name
      );
      this.setState({disabledButton: true});
      this.setState({ uploadAttemps: this.state.uploadAttemps + 1 });
    }
  };
  back = () => {
    if (!this.survey.isFirstPage) {
      this.survey.prevPage();
    }
  };
  complete = () => {
    // this.stopCapture(survey.title, survey.currentPageNo + 1, survey.currentPage.questions[0].name);
    if (this.survey.isLastPage) {
      this.survey.completeLastPage();
    }
  };

  started = () => {
    this.update();
    this.props.webcamDisable();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (this.state.disableDefaultStartPage === true) {
      this.survey.startTimer();
    }
  };
  stopCapture = (SurveyPageNo, surveyQuestionName) => {
    this.props.stopRecording(SurveyPageNo, surveyQuestionName);
  };
  startCapture = () => {
    this.props.startRecording();
  };
  updateQuestions = (page) => {
    var comm = [];
    console.log(page);
    page.questions.forEach((question) => {
      let type = question.getType();
      console.log(question.name);
      switch (type) {
        case "boolean":
          comm = [...comm, question.labelFalse, question.labelTrue];
          break;
        case "radiogroup":
        case "dropdown":
        case "checkbox":
        case "imagepicker":
          question.choices.forEach((choice) => {
            comm.push(choice.calculatedText);
          });
          break;
        // case "rating":

        // break;
        case "matrix":
          question.columns.forEach((column) => {
            comm.push(column.calculatedText);
          });
          break;
        default:
          break;
      }
    });
    this.setState({ commands: comm });
  };
  pageChanged = (sender, options) => {
    if (sender.state === "running") {
      this.updateQuestions(options.page);
      this.props.setVisualizer(options.page.visualizer);
      this.startCapture();
      setTimeout(() => {
        this.setState({disabledButton:false});
      }, 1500);
    }
  };
  // testPage=(sender,options)=>{
  //     console.log(sender)
  //     console.log(options)
  // }
  //sending voice command received from Dictaphone to Survey to attempt a setVal
  sendAns = (action, text) => {
    this.survey.currentPage.questions.forEach((question) => {
      let type = question.getType();
      switch (type) {
        case "boolean":
          switch (text) {
            case question.labelTrue:
              this.survey.setValue(question.name, true);
              break;
            case question.labelFalse:
              this.survey.setValue(question.name, false);
              break;
          }
          break;
        case "radiogroup":
        case "dropdown":
        case "rating":
        case "checkbox":
        case "imagepicker":
          var item = question.activeChoices.find(
            (item) => item.calculatedText === text
          );

          if (item) {
            this.survey.setValue(question.name, item.itemValue);
          }
          break;
        case "matrix":
          let obj = {};
          let objVal = question.visibleColumns.find(
            (item) => item.locText.renderedText === text
          );
          question.visibleRows.forEach((row) => {
            obj[row.item.itemValue] = objVal.value;
          });
          this.survey.setValue(question.name, obj);
          break;
        default:
          break;
      }
    });
  };

  //get survey states regarding first page, last page, and if survey is running, completed or not, used to determine which external buttons to show
  //Also, if a custom timer is required it will be implemented here, most likely
  update = () => {
    // let survStartTime;
    // let pageStartTime = new Date().getTime();
    // if(started!== this.state.started){
    //     survStartTime=pageStartTime;
    //     this.setState({survStartTime:survStartTime});
    // }

    this.setState({
      first: this.survey.isFirstPage,
      last: this.survey.isLastPage,
      started: this.survey.state,
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.localStrings.locale !== this.props.localStrings.locale) {
      console.log("language changed " + this.props.localStrings.locale);

      this.survey.locale = this.props.localStrings.locale;
      this.setState(
        { locale: this.props.localStrings.locale },
        this.modelUpdate
      );
      return;
    }
    if (prevProps.failedUploads !== this.props.failedUploads) {
      this.setState({ failedUploads: this.props.failedUploads });
      return;
    }
    if (prevProps.successfulUploads !== this.props.successfulUploads) {
      this.setState({ successfulUploads: this.props.successfulUploads });
      return;
    }
  }
  modelUpdate = () => {
    this.survey.render();
    this.updateQuestions(this.survey.currentPage);
    // this.child.current.locale(this.state.loacle);
  };
  val = (sender, options) => { };
  uploadFiles = (survey, options) => {
    let temporaryFilesStorage = this.state.temporaryFilesStorage;
    if (temporaryFilesStorage[options.name] !== undefined) {
      temporaryFilesStorage[options.name].concat(options.files);
    } else {
      temporaryFilesStorage[options.name] = options.files;
    }
    this.setState({ temporaryFilesStorage: temporaryFilesStorage });
    var question = survey.getQuestionByName(options.name);
    var content = [];
    options.files.forEach(function (file) {
      let fileReader = new FileReader();
      fileReader.onload = function (e) {
        content = content.concat([
          {
            name: file.name,
            type: file.type,
            content: fileReader.result,
            file: file,
          },
        ]);
        if (content.length === options.files.length) {
          //question.value = (question.value || []).concat(content);
          options.callback(
            "success",
            content.map(function (fileContent) {
              return { file: fileContent.file, content: fileContent.content };
            })
          );
        }
      };
      fileReader.readAsDataURL(file);
    });
  };
  clearFiles = (survey, options) => {
    let fileInfoToRemove;
    let temporaryFilesStorage = this.state.temporaryFilesStorage;
    var tempFiles = temporaryFilesStorage[options.name];
    if (tempFiles) {
      fileInfoToRemove = tempFiles.filter(function (file) {
        return file.name === options.fileName;
      })[0];
    }
    if (fileInfoToRemove !== undefined) {
      var index = tempFiles.indexOf(fileInfoToRemove);
      tempFiles.splice(index, 1);
    }
    if (!fileInfoToRemove || tempFiles.length <= 0) {
      delete temporaryFilesStorage[options.name];
    } else {
      temporaryFilesStorage[options.name] = tempFiles;
    }
    this.setState({ temporaryFilesStorage: temporaryFilesStorage });
    // Code to remove temporary stored files
    // Write your own code to remove files fron server if they were loaded already
    // and then invoke success and allow to proceed further
    options.callback("success");
  };

  onValueChanged = (sender, options) => {
    console.log(options);
    let answerLogObj = {
      pageNum: sender.currentPageNo + 1,
      questionName: options.question.name,
      totalSurveyTime: sender.timeSpent,
      pageTime: options.question.page.timeSpent,
      chosenValue: options.value,
    };
    this.setState({ answerLog: [...this.state.answerLog, answerLogObj] });
  };

  //Deal with data on survey completion

  endFunc = (survey) => {
    let threshold = [...survey.calculatedValues].find(
      (calculatedValue) => calculatedValue.name === "crossThreshold"
    );
    if (threshold && threshold.value) {
      survey.scoreThreshold = 0;
    }
    let times = this.state.surveyTimes;
    times.total = survey.timeSpent;
    this.setState({ surveyTimes: times });
    var backend = this.props.backend;
    var user = this.state.userId || this.state.anonUserId;
    var surveyId = this.props.surveyId;
    var recordingId =  (this.props.camera && this.props.microphone? this.props.recordingId : null);
    var answerLog = this.state.answerLog
    var saveSurveyResults = this.props.saveSurveyResults;
    console.log(saveSurveyResults);
    if(recordingId === null){
      fetch(`${backend}/api/deleteRecordingContainer/${this.props.recordingId}`)
    }
    function saveFunc() {
      console.log("finally saving");
      var questions = survey.getAllQuestions();
      for (var i = survey.firstPageIsStarted ? 1 : 0; i < questions.length; i++) {
        var key = questions[i].getValueName().split(".").join("");
        if (!results[key])
          results[key] = {
            page: questions[i].page.visibleIndex + 1,
            type: questions[i].getType(),
            question: questions[i].title || questions[i].name,
            answer: null,
            score: 0,
          };
          console.log(i);
          console.log(questions.length);
      }
      console.log("ready to redux");
      // if (!this.props.userId) {
      //   while (guestmail === null) {
      //     guestmail = prompt(
      //       "In order to complete the survey, you must provide an email",
      //       "example@example.com"
      //     );
      //     if (!/^\S+@\S+\.\S+$/.test(guestmail)) {
      //       guestmail = null;
      //     }
      //   }
      // }
      //     const surveyPDF = this.prepareSurveyPDF();
      //     console.log(surveyPDF.mode)
      //     surveyPDF.raw("bloburl").then(blob=>{
      //     //add code to send pdf to db and then save survey results with db address to stream file?


      // })

      saveSurveyResults(
        // this.props.userId || this.props.guestMailId,
        user,
        results,
        surveyId,
        survey.locTitle.values.default || survey.title,
        times.total,
        times.individual,
        totalScore,
        recordingId,
        backend,
        survey.scoreThreshold,
        survey.useScoreThreshold,
        answerLog
      );
    }
    function urltoFile(url, filename, mimeType) {
      return fetch(url)
        .then(function (res) {
          return res.arrayBuffer();
        })
        .then(function (buf) {
          return new File([buf], filename, { type: mimeType });
        });
    }
    //send data and times to parent.
    this.addPageTime(survey, survey.pages[survey.pageCount - 1]);
    survey.stopTimer();
    this.stopCapture(
      survey.pageCount - (survey.firstPageIsStarted ? 1 : 0),
      survey.currentPage.questions[0].name
    );
    // let finalUploads = this.state.uploadAttemps + 1;
    this.setState({ uploadAttemps: this.finalUploads });

    this.setState({
      isCompleted: true,
    });
    var results = {};
    var totalScore = 0;
    var data = survey.data;
    let temporaryFilesStorage = this.state.temporaryFilesStorage;
    //console.log(questions);
    let answer;
    const renameKey = (obj) => {
      if (typeof obj === "object" && obj !== null) {
        let fixedObj = Array.isArray(obj) ? [] : {};
        Object.entries(obj).forEach(([key, value]) => {
          let newKey =
            typeof key === "string" ? key.toString().split(".").join("") : key;
          fixedObj[newKey] = renameKey(value);
        });
        return fixedObj;
      } else {
        return obj;
      }
    };
    let resultsCount = 0;
    let dataArr = Object.keys(data);
    if(dataArr.length===0){
      saveFunc();
    }
    dataArr.forEach(function (qName) {
      console.log(`processing question ${resultsCount + 1} ${qName}`);
      var question = survey.getQuestionByName(qName);
      const qKey = qName.split(".").join("");
      var qValue = data[qName];
      // Object.entries(qValue).forEach(([key, value])=>{
      //   let newKey = key.toString().split('.').join("");
      //   fixedQValue[newKey]=value;
      // });
      var type = question.getType();
      results[qKey] = {
        page: question.page.visibleIndex + 1,
        type: type,
        question: question.description || question.title || question.name,
        answer: renameKey(qValue),
        score: question.score ? question.score : 0,
      };
      var trimmedChoices;
      var row = {};
      var column = {};
      var choicesArr = [];
      var choicesScore = [];
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      switch (type) {
        case "file":
          answer = [];
          let filesToUpload = temporaryFilesStorage[question.name];
          if (!filesToUpload) {
            let fileCount = 0;
            return [...qValue].forEach((toFile) => {
              urltoFile(toFile.content, toFile.name, toFile.type).then(
                function (file) {
                  file.name.replace(/\s/g, '');
                  var formData = new FormData();
                  formData.append("file", file, file.name);
                  let fileOb = {
                    name: file.name,
                    type: file.type,
                    serverFile: true,
                  };
                  fetch(`${backend}/api2/uploadFile`, {
                    headers: {
                      // authorization: "Bearer " + token,
                    },
                    method: "POST",
                    body: formData,
                  }).then((response) => {
                    response.json().then((fileData) => {
                      (fileOb.content = fileData.id),
                        (answer = [...answer, fileOb]);
                      fileCount++;
                      console.log(`files processed: ${fileCount}`);
                      console.log(qValue.length);
                      if (fileCount === [...qValue].length) {
                        results[qKey].answer = answer;
                        totalScore += results[qKey].score
                        resultsCount++;
                        if (resultsCount === dataArr.length) {
                          saveFunc()
                        }
                      }
                    });
                  });
                }
              );
            });
          } else {
            let fileCount = 0;
            return filesToUpload.forEach(function (file) {
              var formData = new FormData();
              formData.append("file", file, file.name);
              let fileOb = {
                name: file.name,
                type: file.type,
                serverFile: true,
              };
              fetch(`${backend}/api2/uploadFile`, {
                headers: {
                  // authorization: "Bearer " + token,
                },
                method: "POST",
                body: formData,
              }).then((response) => {
                response.json().then((fileData) => {
                  (fileOb.content = fileData.id),
                    (answer = [...answer, fileOb]);
                  console.log(`files processed: ${fileCount}`);
                  fileCount++;
                  if (fileCount === filesToUpload) {
                    results[qKey].answer = answer;
                    totalScore += results[qKey].score;
                    resultsCount++;
                    if (resultsCount === dataArr.length) {
                      saveFunc()
                    }
                  }
                });
              });
            });
          }

          break;
        case "signaturepad":
          answer = [];
          urltoFile(question.value, "signpad.png", "image/png").then(function (
            file
          ) {
            var formData = new FormData();
            formData.append("file", file, file.name);

            fetch(`${backend}/api2/uploadFile`, {
              headers: {
                // authorization: "Bearer " + token,
              },

              method: "POST",

              body: formData,
            }).then((response) => {
              response.json().then((fileData) => {
                let fileOb = {
                  name: file.name,
                  type: file.type,
                  content: fileData.id,
                  serverFile: true,
                };
                results[qKey].answer = fileOb;
                totalScore += results[qKey].score;
                resultsCount++;
                if (resultsCount === dataArr.length) {
                  saveFunc()
                }
              });
            });
          });

          break;
        case "multipletext":
        case "text":
        case "comment":
        case "boolean":
          totalScore += results[qKey].score;
          resultsCount++;
          if (resultsCount === dataArr.length) {
            saveFunc()
          }
          break;
        case "checkbox":
        case "imagepicker":
          //image picker can be array or sinngle, force it to array
          trimmedChoices = [];
          results[qKey].answer = [...qValue];
          trimmedChoices = question.choices.filter((choice) => {
            [...qValue].includes(choice.value);
          });
          trimmedChoices.forEach((choice) => {
            results[qKey].score += choice.score;
          });
          totalScore += results[qKey].score;
          resultsCount++;
          if (resultsCount === dataArr.length) {
            saveFunc()
          }
          break;
        case "radiogroup":
        case "dropdown":
        case "rating":
          let choice = question.choices.filter(
            (choice) =>
              (typeof qValue === "string" &&
                qValue.localeCompare(choice.value) === 0) ||
              (typeof qValue === "number" && qValue === choice.value)
          );
          results[qKey].score += choice.score;
          totalScore += results[qKey].score;
          resultsCount++;
          if (resultsCount === dataArr.length) {
            saveFunc()
          }
          break;
        case "ranking":
          trimmedChoices = [];
          trimmedChoices = question.choices.filter(
            (choice) => choice.score !== 0
          );
          let rankedScore = 0;
          let len = trimmedChoices.length;
          for (let index = 0; index < len; index++) {
            rankedScore += trimmedChoices[index].score * (len - index);
          }
          results[qKey].score += rankedScore;
          totalScore += results[qKey].score;
          resultsCount++;
          if (resultsCount === dataArr.length) {
            saveFunc()
          }
          break;
        case "matrix":
          Object.entries(qValue).forEach(([key, value]) => {
            row = question.rows.find(
              (row) => row.value.localeCompare(key) === 0
            );
            column = question.columns.find(
              (column) => column.value.localeCompare(value) === 0
            );
            results[qKey].score += row.score * column.score;
          });
          totalScore += results[qKey].score;
          resultsCount++;
          if (resultsCount === dataArr.length) {
            saveFunc()
          }
          break;
        case "matrixdropdown":
          Object.entries(qValue).forEach(([key, value]) => {
            row = question.rows.find((row) => row.value === key);
            choicesArr = [].concat(...Object.values(value));
            choicesScore = choicesArr.map((choice) => {
              return question.choices.find(
                (schoice) => choice === schoice.value
              ).score;
            });
            results[qKey].score += row.score * choicesScore.reduce(reducer);
          });
          totalScore += results[qKey].score;
          resultsCount++;
          if (resultsCount === dataArr.length) {
            saveFunc()
          }
          break;
        case "matrixdynamic":
          qValue.forEach((row) => {
            choicesArr = [].concat(...Object.values(row));
            choicesScore = choicesArr.map((choice) => {
              return question.choices.find(
                (schoice) => choice === schoice.value
              ).score;
            });
            results[qKey].score += choicesScore.reduce(reducer);
          });
          totalScore += results[qKey].score;
          resultsCount++;
          if (resultsCount === dataArr.length) {
            saveFunc()
          }
          break;
        default:
          totalScore += results[qKey].score;
          resultsCount++;
          if (resultsCount === dataArr.length) {
            saveFunc()
          }
          break;
      }

    })


    // var questions = survey.getAllQuestions();
    // let results = { ...results }
    // for (var i = survey.firstPageIsStarted ? 1 : 0; i < questions.length; i++) {
    //   var key = questions[i].getValueName().split(".").join("");
    //   if (!results[key])
    //     results[key] = {
    //       page: questions[i].page.visibleIndex + 1,
    //       type: questions[i].getType(),
    //       question: questions[i].title || questions[i].name,
    //       answer: null,
    //       score: 0,
    //     };
    // }
    // // if (!this.props.userId) {
    // //   while (guestmail === null) {
    // //     guestmail = prompt(
    // //       "In order to complete the survey, you must provide an email",
    // //       "example@example.com"
    // //     );
    // //     if (!/^\S+@\S+\.\S+$/.test(guestmail)) {
    // //       guestmail = null;
    // //     }
    // //   }
    // // }
    // //     const surveyPDF = this.prepareSurveyPDF();
    // //     console.log(surveyPDF.mode)
    // //     surveyPDF.raw("bloburl").then(blob=>{
    // //     //add code to send pdf to db and then save survey results with db address to stream file?


    // // })
    // this.props.saveSurveyResults(
    //   // this.props.userId || this.props.guestMailId,
    //   this.props.userId || this.props.anonUserId,
    //   results,
    //   this.props.surveyId,
    //   survey.locTitle.values.default || survey.title,
    //   times.total,
    //   times.individual,
    //   totalScore,
    //   this.props.recordingId,
    //   this.props.backend,
    //   survey.scoreThreshold,
    //   survey.useScoreThreshold,
    //   this.state.answerLog
    // );
  }

  //button rendering for startm next and complete
  prepareSurveyPDF() {
    const surveyPDF = new SurveyPDF.SurveyPDF(this.props.survey);
    surveyPDF.data = this.survey.data;
    surveyPDF.mode = "display";
    console.log(surveyPDF.isDisplayMode);
    return surveyPDF;
  }
  rightButtonRender = () => {
    var nextOrComp = !this.survey.isLastPage ? (
      <Button color="primary" className="template-btn" onClick={this.next} disabled={this.state.disabledButton}>
        {this.survey.pageNextText}
      </Button>
    ) : (
      <Button color="primary" className="template-btn" onClick={this.complete} disabled={this.state.disabledButton}>
        {this.survey.completeText}
      </Button>
    );
    var start = (
      <Button color="primary" className="template-btn" onClick={this.start} disabled={this.state.disabledButton}>
        {this.survey.startSurveyText}
      </Button>
    );
    switch (this.survey.state) {
      case "completed":
        return null;
      case "running":
        return this.state.disableDefaultStartPage ? nextOrComp : start;
      default:
        return start;
    }
  };
  leftButtonRender = () => {
    var back =
      !this.survey.isFirstPage &&
        this.survey.state !== "completed" &&
        this.survey.showPrevButton ? (
        <Button color="primary" className="template-btn" onClick={this.back} disabled={this.state.disabledButton}>
          {this.survey.pagePrevText}
        </Button>
      ) : null;
    return (
      <div className={`${back ? "survey-buttons" : "survey-start-button"}`}>
        <div>{back}</div>
      </div>
    );
  };

  // runReRen = () => {

  // };

  languageRender = () => {
    var title =
      this.state.locale === ("en" || "") ? (
        <>
          <Col className="d-flex justify-content-center survey-header" xs={12}>
            <h3>Patient Health Questionnaire</h3>
          </Col>
          <Col className="d-flex justify-content-center survey-header" xs={12}>
            <h5>
              Please make sure that this test is beeing made in a silent room
              without distructions
            </h5>
          </Col>
        </>
      ) : (
        <>
          <Col className="d-flex justify-content-center survey-header" xs={12}>
            <h3>שאלון רפאוי חסוי פרטי לנבדק</h3>
          </Col>
          <Col className="d-flex justify-content-center survey-header" xs={12}>
            <h5>
              מבחן זה הינו דורש ריכוז. אנא השתדלו לודא שהמבחן מתבצע בחדר שקט
              וללא הסחות דעת כלל
            </h5>
          </Col>
        </>
      );
    return <>{title}</>;
  };

  renderSupportedLocales = () => {
    var options = [];
    Object.entries(this.props.Survey.surveyLocalization.localeNames).forEach(
      (entry) => {
        if (
          this.props.Survey.surveyLocalization.supportedLocales.indexOf(
            entry[0]
          ) > -1
        ) {
          options.push({
            id: entry[1],
            value: entry[0],
          });
        }
      }
    );

    return options;
  };
  componentWillUnmount() {
    if (this.survey.state !== "completed") {
      console.log("remove recording container!");
    }
  }
  stringToHTML = (str) => {
    var dom = document.createElement("div");
    dom.innerHTML = str;
    return dom;
  };
  render() {
    let myCss = {
      root: "sv_main sv_default_css round_corn",
      matrix: {
        root: "sv_q_matrix",
        label: "sv_q_m_label",
        itemChecked: "checked",
        itemDecorator: "sv-hidden",
        cellText: "sv_q_m_cell_text",
        cellTextSelected: "sv_q_m_cell_selected",
        cellLabel: "sv_q_m_cell_label",
      },
    };

    myCss.matrix.root += isMobile ? " mobile-root" : " default-height";

    if (this.survey.locale === "he") {
      myCss.root += " text-align";
      myCss.matrix.root += " matrix-text-align";
    }
    var defaultStartPage = (
      <div
        className={this.props.localStrings.locale === "he" ? "text-align" : ""}
        dangerouslySetInnerHTML={{
          __html: this.props.localStrings.defaultSurveyStartPage,
        }}
      />
    );
    var surveyRender = !this.state.disableDefaultStartPage ? (
      defaultStartPage
    ) : !this.state.isCompleted ? (
      <this.props.Survey.Survey
        model={this.survey}
        showCompletedPage={false}
        showNavigationButtons={"none"}
        onComplete={this.endFunc}
        onCurrentPageChanging={this.changePage}
        onAfterRenderSurvey={this.update}
        onAfterRenderPage={this.pageChanged}
        onAfterRenderQuestion={this.signnFormat}
        onStarted={this.started}
        onValidateQuestion={this.val}
        onUploadFiles={this.uploadFiles}
        onClearFiles={this.clearFiles}
        // onUpdatePageCssClasses={this.applyRtl}
        onValueChanged={this.onValueChanged}
        css={myCss}
      />
    ) : null;

    var onSurveyDone = this.state.isCompleted ? (
      <div className="preloader">
        <div className="spinner"></div>
      </div>
    ) : null;
    return (
      <section
        className="feature_area section-padding"
        style={{ height: this.props.isRecording ? "60vh" : "" }}
      >
        <div className="row d-flex justify-content-center pb-5">
          <div className="col-xs-11 col-md-11 col-lg-11 mt-5">
            <WebcamStreamCapture
              recordingId={this.props.recordingId}
              backend={this.props.backend}
              userId={this.props.userId}
              anonUserId={this.props.anonUserId}
            />

            {surveyRender}
            {onSurveyDone}
            {/* {this.survey.isFirstPage && (
              <div className="mt-4">
                <Form
                  className={
                    this.props.localStrings.locale === "he" ? "text-align" : ""
                  }
                >
                  <FormGroup tag="fieldset">
                    <FormGroup check>
                      <Label check>
                        <Input
                          id="cameraOnly"
                          type="radio"
                          name="radio1"
                          onClick={(e) => {
                            this.props.changeRecordingPermissions(true, false);
                          }}
                        />
                        {this.state.locale === "he" && (
                          <span
                            style={{
                              paddingRight: "15px",
                            }}
                          ></span>
                        )}
                        {this.props.localStrings.cameraOnly}
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          id="audioOnly"
                          type="radio"
                          name="radio1"
                          onClick={(e) => {
                            this.props.changeRecordingPermissions(false,true);
                          }}
                        />
                        {this.state.locale === "he" && (
                          <span
                            style={{
                              paddingRight: "15px",
                            }}
                          ></span>
                        )}
                        {this.props.localStrings.audioOnly}
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          id="textOnly"
                          type="radio"
                          name="radio1"
                          onClick={(e) => {
                            this.props.changeRecordingPermissions(false, false);
                          }}
                        />
                        {this.state.locale === "he" && (
                          <span
                            style={{
                              paddingRight: "15px",
                            }}
                          ></span>
                        )}
                        {this.props.localStrings.textOnly}
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          id="cameraAndAudio"
                          type="radio"
                          name="radio1"
                          onClick={(e) => {
                            this.props.changeRecordingPermissions(true, true);
                          }}
                        />
                        {this.state.locale === "he" && (
                          <span
                            style={{
                              paddingRight: "15px",
                            }}
                          ></span>
                        )}
                        {this.props.localStrings.cameraAndAudio}
                      </Label>
                    </FormGroup>
                  </FormGroup>
                </Form>
              </div>
            )} */}
            {this.props.isStreaming ? (
              <div
                className="d-flex justify-content-between mt-3"
                dir={this.props.localStrings.locale === "he" ? "rtl" : ""}
              >
                {this.leftButtonRender()}
                {this.rightButtonRender()}
              </div>
            ) : null}
            <Dictaphone
              sendAns={this.sendAns}
              commandArr={this.state.commands}
              backednd={this.props.backend}
              sendCmnd={this.chooseCtrl}
            />
          </div>
        </div>
      </section>

      // <div className="grid-container">

      //     <div className="Video"><WebcamStreamCapture /></div>

      //     <div className="Survey">
      //         {surveyRender}
      //         {onSurveyDone}
      //     </div>

      //     {this.props.isStreaming ?
      //         <React.Fragment>
      //             <div className="right-controller">
      //                 <div className="right-btn">
      //                     {this.rightButtonRender()}
      //                 </div>
      //             </div>
      //             <div className="left-controller">
      //                 <div className="left-btn">
      //                     {/* {this.leftButtonRender()} */}
      //                 </div>
      //             </div>
      //         </React.Fragment>

      //         :
      //         null}
      //     <Dictaphone sendAns={this.sendAns} json={this.state.jsonCommands} />
      //     <div className="footer"></div>
      // </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isRecording: state.user.isRecording,
  isStreaming: state.user.isStreaming,
  localStrings: state.language,
  failedUploads: state.user.failedUploads,
  successfulUploads: state.user.successfulUploads,
  camera: state.recordingPermissions.camera,
  microphone: state.recordingPermissions.microphone
  // recordingPermissions: state.recordingPermissions,
  // userId: state.auth.userId,
});

export default connect(mapStateToProps, {
  toggleRecording,
  saveSurveyResults,
  startRecording,
  stopRecording,
  webcamDisable,
  setVisualizer,
  cleanup,
  // changeRecordingPermissions,
})(Frame);
