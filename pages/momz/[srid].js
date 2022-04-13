//React
import React, { useEffect, useState } from "react";

//NextJS
import { useRouter } from "next/router";
import Link from "next/link";

//NextAuth
import { getSession } from "next-auth/client";

//ReactStrap
import { Container, Button } from "reactstrap";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { SET_URL_HISTORY, RESET_ATTEMPTS } from "../../redux/types";

//Components
import Frame from "../../components/Frame/Frame";

const Survey = (props) => {
  const [anonUserId, setAnonUserId] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const surveyComplete = useSelector((state) => state.user.surveyComplete);
  const [recordingId, setRecordingId] = useState(null);

  useEffect(() => {
    let localUser = JSON.parse(window.localStorage.getItem("anonUser"));
    setAnonUserId(localUser);
  }, []);

  useEffect(() => {
    if (surveyComplete) {
      setTimeout(() => {
        
        dispatch({
          type: SET_URL_HISTORY,
          payload: { urlHistory: router.asPath },
        });
  
        router.push("/surveys/surveyForm");
      }, 5000);
    }
  }, [surveyComplete, dispatch, router]);

  useEffect(() => {
    dispatch({ type: RESET_ATTEMPTS, payload: {} });
  }, [dispatch]);

  const changeToSurvey = () => {
    // setIsConfirmed(true);
    props.Survey.Serializer.addProperty("question", {
      name: "score:number",
      default: 0,
    });
    props.Survey.Serializer.addProperty("itemvalue", {
      name: "score:number",
      default: 0,
    });
    props.Survey.Serializer.addProperty("survey", {
      name: "showExtraTimer:boolean",
    });
    props.Survey.Serializer.addProperty("survey", {
      name: "scoreThreshold:number",
      default: 0,
    });
    props.Survey.Serializer.addProperty("survey", {
      name: "useScoreThreshold:boolean",
      default: false,
    });
    props.Survey.Serializer.addProperty("page", {
      name: "visualizer:boolean",
      default: false,
    });
    fetch(
      `${props.backend}/api/createRecordingContainer`,
      {
        headers: {
          "Content-Type": "application/json",
          // 'authorization': 'Bearer ' + token
        },

        method: "POST",

        body: JSON.stringify({
          surveyId: props.surveyId,
          userId: props.userId,
        }),
      }
    ).then((containerResponse) => {
      containerResponse.json().then((createNewContainerResponse) => {
        if (createNewContainerResponse.recordingId) {
          setRecordingId(createNewContainerResponse.recordingId);
        } else {
          alert("Error creating container, try again later");
        }
      });
    });
  };
  useEffect(() => {
    changeToSurvey();
  }, []);
  if (recordingId) {
    return (
      <>
        <Container>
          <div className="mb-5">
            <Frame
              userId={props.session && props.session.user.name.userId}
              recordingId={recordingId}
              survey={JSON.parse(props.survey)}
              surveyId={router.query.srid}
              backend={props.backend}
              guestMailId={props.guestMailId}
              Survey={props.Survey}
              anonUserId={anonUserId}
            />{" "}
            <br />
          </div>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container>
          <div className="preloader">
            <div className="spinner"></div>
          </div>
        </Container>
      </>
    );
  }
};

export async function getServerSideProps(context) {
  //**Provider = Google,Facebook,Twitter... */
  //**Credentials = Our own register method using our Backend */

  //Getting Session object from cookies.
  const session = await getSession(context);
  const srid = context.params.srid;
  //Difining session for mutation.
  let responseSession = { user: { name: {} } };

  //Cheking if session has UserId property (if not this means the user logged in using Provider).
  if (session && !session.hasOwnProperty("userId")) {
    const resSession = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_BACK_END}/api/varifyUserProviderSession/${session.user.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // authorization: "Bearer " + token,
        },
      }
    );

    //Mutating the session with new information.
    responseSession.user.name = await resSession.json();
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACK_END}/api/getSurveyById/${context.params.srid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // authorization: "Bearer " + token,
      },
    }
  );
  const surveyResponse = await response.json();

  if (!surveyResponse || response.status === 666) {
    return {
      notFound: true,
    }; // Shows page 404
  }
  return {
    props: {
      session: responseSession,
      survey: JSON.stringify(surveyResponse),
      surveyId: srid,
      userId: responseSession.user.name.userId
        ? responseSession.user.name.userId
        : null,
      //recordingId: createNewContainerResponse.recordingId,
      backend: process.env.NEXT_PUBLIC_REACT_APP_BACK_END,
      guestMailId: process.env.NEXT_PUBLIC_REACT_APP_GUEST_USER_ID,
    },
  };
}

export default Survey;
