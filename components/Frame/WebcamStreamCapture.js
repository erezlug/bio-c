import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Select from "react-dropdown-select";
import { useSelector, useDispatch } from "react-redux";
import * as recordingActions from "../../redux/actions/recordingActions";
import * as recordingPermissionsActions from "../../redux/actions/recordingPermissionsActions";
import hark from "hark";
import Toggle from "react-toggle";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router"
import { Button, ButtonGroup } from 'reactstrap';

//import useToggle from "../Hooks/useToggle/useToggle";

// jest.setup.js

function WebcamStreamCapture({ recordingId, backend, userId, anonUserId }) {
  // const getSupportedMimeTypes = () => {
  //   const VIDEO_TYPES = [
  //     "flv",
  //     "ogg",
  //     "mp4",
  //     "webm",
  //     "x-matroska",
  //     "3gpp",
  //     "3gp2",
  //      "x-mp4",
  //      "mpeg2",
  //      "m4v",
  //     "mpeg",
  //     "avi"

  //   ];
  //   const VIDEO_CODECS = [

  //     "h265",
  //     "h.265",
  //     "h264",
  //     "h.264",
  //     "avc1",
  //     "av1",
  //     "vp9",
  //     "vp9.0",
  //     "vp8",
  //     "vp8.0",

  //   ];
  //   const AUDIO_CODECS = [
  //     "vorbis",
  //     "opus",
  //   ]
  //   const supportedTypes = [];
  //   VIDEO_TYPES.forEach((videoType) => {
  //     const type = `video/${videoType}`;
  //     VIDEO_CODECS.forEach((codec) => {
  //       const variations = [
  //         `${type}; codecs=${codec}`,
  //         `${type}; codecs:${codec}`,
  //         `${type}; codecs=${codec.toUpperCase()}`,
  //         `${type}; codecs:${codec.toUpperCase()}`
  //       ]
  //       AUDIO_CODECS.forEach((audioCodec=>{
  //         variations.push(`${type}; codecs=${codec},${audioCodec}`)
  //         variations.push(`${type}; codecs:${codec},${audioCodec}`)
  //         variations.push(`${type}; codecs=${codec.toUpperCase()}, ${audioCodec.toUpperCase()}`)
  //         variations.push(`${type}; codecs:${codec.toUpperCase()}, ${audioCodec.toUpperCase()}`)
  //       }))
  //       variations.forEach(variation => {
  //         if (MediaRecorder.isTypeSupported(variation))
  //           supportedTypes.push(variation);
  //           // supportedTypes.push(variation.replace(/;/g, "; "));

  //       })
  //     });
  //     if (MediaRecorder.isTypeSupported(type)) supportedTypes.push(type);
  //     if (MediaRecorder.isTypeSupported(`${type};`)) supportedTypes.push(`${type};`);
  //   });
  //   return supportedTypes;
  //   // return ["video/webm;codecs=H264"];
  // }
  const router = useRouter();

  const usingVideo = useSelector((state) => state.recordingPermissions.camera);
  const usingAudio = useSelector((state) => state.recordingPermissions.microphone);
  const [mediaMime, setMediaMime] = useState("");
  const [count, setCount] = useState(0);
  const bps = 1500000;
  const webcamRef = useRef(null);
  const visualizerRef = useRef(null);
  const visualizerVis = useSelector((state) => state.user.visualizer)
  const surveyComplete = useSelector((state) => state.user.surveyComplete);
  const mediaRecorderRef = useRef(null);
  const bestMime = useRef(null);
  const [videoAllow, setvideoAllow] = useState(true)
  const [audioAllow, setAudioAllow] = useState(true);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [error, setError] = useState(false);
  const [notAllow, setNotAllow] = useState(false);
  const [deviceId, setDeviceId] = useState({});
  const [tempId, settempId] = useState(null);
  const [audioDevices, setAudioDevices] = useState([]);
  const [devices, setDevices] = useState([]);
  const [audioDeviceId, setAudioDeviceId] = useState({});
  const hiddenVid = useSelector((state) => state.user.webcamStop);
  const speechEvents = useRef(null);
  //const streaming = useSelector((state) => state.user.isStreaming);
  const language = useSelector((state) => state.language);
  const recording = useSelector((state) => state.user.isRecording);
  const surveyQuestionDetails = useSelector(
    (state) => state.user.surveyQuestionDetails
  );
  const isStreaming = useSelector((state) => state.user.isStreaming);
  const trackStore = useRef(null);
  const audioTrackStore = useRef(null);
  const recogState = useSelector((state) => state.user.recogState);
  const dispatch = useDispatch();

  // const handleTofuChange = () => {
  //   setusingVideo((prevState) => {
  //     return !prevState;
  //   });
  // };
  const updateStream = (devId) => {
    if (speechEvents.current !== null) {
      speechEvents.current.stop();
      speechEvents.current = null;
    }
    dispatch(recordingActions.setStreaming(false));
    if (tempId !== null) {
      settempId(null);
    }
    return setDeviceId(devId);
  };

  useEffect(() => {
    const supportedTypes = [];

    const variations = [
      "video/x-matroska;codecs=avc1,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm;codecs=vp9,opus",
      "video/webm",
    ];

    variations.forEach((variation) => {
      if (MediaRecorder.isTypeSupported(variation))
        supportedTypes.push(variation);
    });
    bestMime.current = supportedTypes;
  }, []);
  useEffect(() => {
    //make sure to properly remove all tracks when leaving page (important if tracks were stored in trackStore)
    return () => {
      if (trackStore.current) {
        trackStore.current.map(function (track) { return track.stop(); });
        console.log("removed video tracks")
      }
      if (audioTrackStore.current) {
        audioTrackStore.current.map(function (track) { return track.stop(); });
        console.log("removed audio tracks")
      }
      dispatch(recordingPermissionsActions.changeRecordingPermissions(true, true));
    }
  }, [])
  const updateAudioStream = (devId) => {
    if (speechEvents.current !== null) {
      speechEvents.current.stop();
      speechEvents.current = null;
    }
    dispatch(recordingActions.setStreaming(false));
    return setAudioDeviceId(devId);
  };
  const handleDevices = useCallback(
    (mediaDevices) => {
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
      setAudioDevices(mediaDevices.filter(({ kind }) => kind === "audioinput"));
    },
    [setDevices]
  );
  useEffect(() => {
    if (webcamRef.current.stream) {
      if (usingVideo) {
        if (trackStore.current) {
          trackStore.current.forEach((track) => {
            webcamRef.current.stream.addTrack(track);
          })
          trackStore.current = null;
        }
      } else {
        let tempTracks = webcamRef.current.stream.getVideoTracks();
        trackStore.current = tempTracks;
        tempTracks.forEach((track) => {
          webcamRef.current.stream.removeTrack(track);
        })
      }
      console.log(webcamRef.current.stream.getTracks());
    }
  }, [usingVideo]);

  // useEffect(() => {
  //   if (webcamRef.current.stream) {
  //     // if (usingAudio) {
  //     //   if (audioTrackStore.current) {
  //     //     audioTrackStore.current.forEach((track) => {
  //     //       webcamRef.current.stream.addTrack(track);
  //     //     })
  //     //     audioTrackStore.current=null;
  //     //   }
  //     // } else {
  //     //   let tempTracks = webcamRef.current.stream.getAudioTracks();
  //     //   audioTrackStore.current=tempTracks;
  //     //   tempTracks.forEach((track) => {
  //     //     webcamRef.current.stream.removeTrack(track);
  //     //   })
  //     // }
  //     console.log(webcamRef.current);
  //   }
  // }, [usingAudio]);
  const resetStream = () => {
    console.log("called");
    //setup deviceId for attempted restore if deviceId was already updated via setDeviceId
    if (tempId !== null) {
      let index = devices.findIndex((device) => device.deviceId === tempId);
      updateStream(devices[index].deviceId);
    }
    //if this is the first time webcam is running it runs without the deviceId constraint, so force new deviceId constraint
    else {
      updateStream(devices[0].deviceId);
    }
  };

  useEffect(() => {
    if (devices.length === 0 && audioDevices.length === 0) {
      window.navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }
  }, [devices, audioDevices, handleDevices]);

  const videoConstranits = useRef({
    aspectRatio: { ideal: 16 / 9 },
    frameRate: { max: 30 },
    facingMode: "user",
    width: { ideal: 1280, max: 1280 },
    resizeMode: "crop-and-scale",
  });
  const audioConstraints = useRef({
    channelCount: { max: 1 },
    noiseSuppression: true,
    echoCancellation: true,
    sampleRate: { min: 44000 },
  });
  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  // const handleDispatch = useCallback(() => {
  //   dispatch(recordingActions.toggleRecording(recording));
  // }, [dispatch, recording]);

  const handleStartCaptureClick = useCallback(() => {
    console.log(webcamRef.current)
    if (usingVideo || usingAudio) {
      console.log("start click")
      if (capturing === false && count < bestMime.current.length) {
        setCapturing(true);
        try {
          mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: usingVideo ? bestMime.current[count] : "audio/webm",
            videoBitsPerSecond: bps - (bps > 1280000 ? 128000 : bps * 0.1),
            audioBitsPerSecond: bps > 1280000 ? 128000 : bps * 0.1,
          });
          mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
          );

          mediaRecorderRef.current.start();
          console.log('recording started');
        } catch (error) {
          console.log(error);
          setCapturing(false);
          setCount(count + 1);
          console.log('recording failed to start');
          //by setting capture to false, we ensure that handleDispatch will be called again, and when it is it will attempt handleStartCaptureClick
        }
      }
    }
  }, [
    capturing,
    count,
    webcamRef,
    setCapturing,
    mediaRecorderRef,
    handleDataAvailable,
    bps,
    usingVideo,
    usingAudio,
    trackStore.current
  ]);

  //run

  const handleStopCaptureClick = useCallback(() => {
    if (usingVideo || usingAudio) {
      console.log("stop click")
      setMediaMime(mediaRecorderRef.current.mimeType);
      mediaRecorderRef.current.stop();
      setCapturing(false);
      console.log('recording stopped');
    }
  }, [usingVideo, usingAudio]);

  useEffect(() => {
    if (recordedChunks.length) {
      console.log('sending recording');
      const blob = new Blob(recordedChunks, {
        type: usingVideo
          ? mediaMime === "video/x-matroska;codecs=avc1,opus"
            ? "video/mkv"
            : "video/webm"
          : "audio/webm",
      });
      dispatch(
        recordingActions.sendRecording(
          blob,
          recordingId,
          surveyQuestionDetails,
          backend,
          userId || anonUserId
        )
      );
      setRecordedChunks([]);
    }
  }, [recordedChunks, dispatch, recordingId, mediaMime, surveyQuestionDetails]);

  //Moved from line 178 to line 156
  useEffect(() => {
    if (recording) {
      handleStartCaptureClick();
    } else if (capturing) {
      handleStopCaptureClick();
    }
  }, [recording, capturing, handleStartCaptureClick, handleStopCaptureClick]);

  //This will run once the webcamRef gets the user media
  const updateCons = (notAllowed) => {
    // if (webcamRef.current) {
    console.log(webcamRef.current);
    if (audioAllow && !notAllowed) {
      if (!isMobile) {
        console.log("harking")
        speechEvents.current = hark(webcamRef.current.stream, {
          interval: 50,
          threshold: -75,
        });

        speechEvents.current.on("speaking", function () {
          if (visualizerRef.current && visualizerVis) { visualizerRef.current.style.backgroundColor = '#02AEEB'; }
          dispatch(recordingActions.startRecog());
        });
        speechEvents.current.on("volume_change", (vol, threshhold) => {
          if (vol > threshhold) {
            if (visualizerRef.current) {
              visualizerRef.current.style.width = `${Math.min((2 * (Math.trunc(vol) + Math.abs(threshhold))), 100)}%`
            }
          }
        });
        speechEvents.current.on("stopped_speaking", function () {
          dispatch(recordingActions.stopRecog());
          if (visualizerRef.current) {
            visualizerRef.current.style.width = `0px`
            visualizerRef.current.style.backgroundColor = '#02AEEB';
          }
        });
        setError(false);
      }
      if (webcamRef.current.stream.getVideoTracks().length !== 0) {
        webcamRef.current.video.onloadeddata = () => {
          dispatch(recordingActions.setStreaming(true));
        };
      }
      else {
        dispatch(recordingActions.setStreaming(true));
      }
    }
    else {
      dispatch(recordingActions.setStreaming(true));
      setError(false);
    }

  };
  const forceNoCam = useCallback(() => {
    setvideoAllow(false);
    dispatch(recordingPermissionsActions.changeRecordingPermissions(false, true));
    navigator.mediaDevices.getUserMedia({ audio: audioConstraints, video: false }).then(stream => {
      webcamRef.current.stream = stream;
      webcamRef.current.state = { hasUserMedia: true }
      updateCons(false);
    })
      .catch(function (err) {
        onUserMediaError(err);
      });
  }, []);
  const forceTextOnly = useCallback((notAllowed) => {
    setvideoAllow(false);
    setAudioAllow(false);
    dispatch(recordingPermissionsActions.changeRecordingPermissions(false, false));
    navigator.mediaDevices.getUserMedia({ audio: audioConstraints, video: false }).then(stream => {
      webcamRef.current.stream = stream;
      webcamRef.current.state = { hasUserMedia: true }
    })
      .catch(function (err) {
        console.log(err)
        console.log("mic not available");
      }).finally(() => {
        updateCons(notAllowed);
      })
  }, []);
  const onUserMediaError = (err) => {
    console.error("error obtaining webcam stream-" + err);
    let tempErr;
    let temp = deviceId;
    if (JSON.stringify(temp) !== JSON.stringify({})) {
      settempId(temp);
      setDeviceId({});
    }
    switch (err.name) {
      case "OverconstrainedError":
        console.log(err.constraint);
        console.log(err.message);
        break;
      case "NotAllowedError":
        //fetch(`${backend}/api/deleteRecordingContainer/${recordingId}`).then(router.replace('/no-permissions'));
        setNotAllow(true);
        break;
      case "NotFoundError":

        break;
      case "InvalidStateError":
        break;
      case "NotReadableError":
        break;
      default:
        console.log(err);
    }

    dispatch(recordingActions.setStreaming(false));
    setError(err);


  };

  return (
    <React.Fragment>
      {/* ***** Devices options ***** */}
      <div className="d-flex justify-content-center" hidden={!visualizerVis}>
        <div hidden={!visualizerVis} id="visualizer" ref={visualizerRef} style={{ height: "1vh", backgroundColor: "#00000000" }}></div>
      </div>
      <div hidden={hiddenVid}>
        <div className="row">
          <div className="col-sm-6 col-md-5 col-lg-4">
            {/* <Select
              className="deviceSelect"
              options={devices}
              valueField="deviceId"
              disabled={capturing}
              onChange={(values) => updateStream(values[0].deviceId)}
            /> */}

            {/* <label
              hidden={error || !isStreaming}
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{language.survWithoutVideo}</span>
              <Toggle
                defaultChecked={usingVideo}
                icons={false}
                onChange={() => { dispatch(recordingPermissionsActions.changeRecordingPermissions(!usingVideo, true)) }}
              />
              <span>{language.survWithVideo}</span>
            </label> */}
            {audioAllow && !error &&
              <ButtonGroup>
                {videoAllow && <Button color="info" active={videoAllow && usingVideo} onClick={() => { dispatch(recordingPermissionsActions.changeRecordingPermissions(true, true)) }}>Full Webcam</Button>}
                <Button color="info" active={!usingVideo && usingAudio} onClick={() => { dispatch(recordingPermissionsActions.changeRecordingPermissions(false, true)) }}>Mic Only</Button>
                <Button color="info" active={!usingAudio && !usingVideo} onClick={() => { dispatch(recordingPermissionsActions.changeRecordingPermissions(false, false)) }}>Don't Record Anything</Button>
              </ButtonGroup>
            }
          </div>
          {/* <div className="col">
            <Select
              className="deviceSelect"
              options={audioDevices}
              valueField="deviceId"
              disabled={capturing}
              onChange={(values) => updateAudioStream(values[0].deviceId)}
            />
          </div> */}
          {/* <div className="col">
          {streaming ? (
            !error ? (
              count <= bestMime.current.length ? (
                <button
                  style={{ width: "100%", height: "100%" }}
                  onClick={setHiddenVid}
                >
                  {capturing ? "Stop " : "Start "}Capture
                </button>
              ) : null
            ) : null
          ) : null}
        </div> */}
        </div>
        {error ?
          <>
            {!notAllow ?
              (
                <div>
                  camera unaviable please try one of the follwing:<br />close all programs using the camera and{" "}
                  <Button color="primary" className="template-btn" onClick={resetStream}>try again</Button>;{" "}<Button color="primary" className="template-btn" onClick={forceNoCam}>continue without camera</Button>;<Button color="primary" className="template-btn" onClick={() => forceTextOnly(false)}>continue with text only</Button> or:
                  <Select
                    className="deviceSelect"
                    placeholder="choose a different device"
                    options={devices}
                    valueField="deviceId"
                    disabled={capturing}
                    onChange={(values) => updateStream(values[0].deviceId)}
                  />
                </div>
              ) :
              <div>
                camera and microphone unavailable please try one of the follwing:<br /><button onClick={() => forceTextOnly(true)}>continue with text only</button>
              </div>
            }</> : null}
        {/* <div className="row justify-content-md-center">
          {recogState ? "SPEECH" : null}
        </div> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Webcam
            style={{ width: "60%" }}
            hidden={error || !usingVideo || !videoAllow}
            className="videoBox"
            audio={audioAllow}
            ref={webcamRef}
            onUserMedia={() => updateCons(false)}
            onUserMediaError={onUserMediaError}
            videoConstraints={{ ...videoConstranits.current, deviceId }}
            audioConstraints={{
              ...audioConstraints.current,
              deviceId: audioDeviceId,
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default WebcamStreamCapture;
