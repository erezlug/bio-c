//React
import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";
import { useRouter } from "next/router";

//CSS
import "../public/css/bootstrap.min.css";
import "../public/css/animate.css";
import "../public/css/icofont.min.css";
import "../public/css/meanmenu.css";
import "react-tabs/style/react-tabs.css";
import "../node_modules/react-modal-video/css/modal-video.min.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "../public/css/style.css";
import "../public/css/responsive.css";
import "../utils/customCSS/spinner.css";
import "../components/Frame/Frame.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toggle/style.css";

//Components
import Layout from "../components/_App/Layout";
import MessageModal from "../components/Modal/MessageModal";
import IdleTimeOutModal from "../components/Modal/idleTimeoutModal";
import FormModal from "../components/Modal/FormModal";

//Redux
import { Provider } from "react-redux";
import { store } from "../redux/store";
// import { logout } from "../redux/actions/authActions";

//Idle-Timer
import IdleTimer from "react-idle-timer";

//props
import * as Survey from "survey-react";

//NextAuth
import {
  Provider as NextProvider,
  signOut,
  useSession,
  getSession,
} from "next-auth/client";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  //Timeout Modal States
  const timeout = 3000 * 60 * 60; //1 hour
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [session] = useSession();
  const backendEnv = process.env.NEXT_PUBLIC_REACT_APP_BACK_END;
  let idleTimer = null;

  const [profileData, setProfileData] = useState({});

  const getProfileSession = async () => {
    let tempSession = await getSession();
    if (tempSession) {
      if (typeof tempSession.name !== "object") {
        let profileRes = await fetch(
          `${backendEnv}/api/getProfileByEmail/${tempSession.user.email}`
        );
        const response = await profileRes.json();
        // window.localStorage.clear();

        setProfileData(response[0]);
      } else {
        setProfileData({});
      }
    }
  };
  const creatAnonUserOnDB = async () => {
    let anonUser;
    try {
      const response = await fetch(`${backendEnv}/api/createAnonUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      anonUser = await response.json();
      if (response.status === 200 || response.status === 201) {
        window.localStorage.setItem("anonUser", JSON.stringify(anonUser._id));
      } else {
        console.log("Failed to save Anon credentials");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const createAnonUser = async () => {
    let tempSession = await getSession();
    let anonUser = window.localStorage.getItem("anonUser");
    if (!anonUser && !tempSession) {
      console.log("1");
      creatAnonUserOnDB();
    }
    else if (anonUser) {
      let anonUserExist = await fetch(`${backendEnv}/api/checkAnonUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:
          JSON.stringify({ userId: anonUser }),

      });
      let aUEResponse = await anonUserExist.json()
      if(aUEResponse.success === false){
        window.localStorage.removeItem("anonUser");
        creatAnonUserOnDB();
      }
    }
  };
  useEffect(() => {
    getProfileSession();
    createAnonUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAction = () => {
    // console.log("user did something.");
    setIsTimedOut(false);
  };

  const onIdle = () => {
    if (!isTimedOut && session) {
      setShowModal(true);
      idleTimer.reset();
      setIsTimedOut(true);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    setShowModal(false);
    signOut();
    sessionStorage.removeItem("userData");
    router.push("/");
  };
  return (
    <Provider store={store}>
      <NextProvider>
        <Layout profileData={profileData} getProfileSession={getProfileSession}>
          <IdleTimer
            ref={(ref) => {
              idleTimer = ref;
            }}
            // element={document}
            // onActive={onActive}
            onIdle={onIdle}
            onAction={onAction}
            // debounce={250}
            timeout={timeout}
          />
          <IdleTimeOutModal
            showModal={showModal}
            handleCancel={handleCancel}
            handleLogout={handleLogout}
          />
          <FormModal />
          <MessageModal />
          <Component {...pageProps} Survey={Survey} />
        </Layout>
      </NextProvider>
    </Provider>
  );
};

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });
//   const backend=process.env.NEXT_PUBLIC_REACT_APP_BACK_END;
//   const dashboardUrl= process.env.NEXT_PUBLIC_ADMIN_DASHBOARD;
//   const momzSurveyId= process.env.NEXT_PUBLIC_MOMZ_SURVEY_ID;

//   return {
//     props: {
//       dashboardUrl: dashboardUrl,
//       momzSurveyId: momzSurveyId,
//       session: session,
//     },
//   };
// }

export default MyApp;
