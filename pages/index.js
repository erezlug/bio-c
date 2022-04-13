//React
import React from "react";

//Pages
// import AboutSection from "../components/Home/AboutSection";
import MainBanner from "../components/Home/MainBanner";
import Footer from "../components/_App/Footer";

//Components
import NewsletterForm from "../components/Common/NewsletterForm";

//Redux
import { getSession } from "next-auth/client";

const Index = ({ backend, dashboardUrl, momzSurveyId }) => {
  // const [profileData, setProfileData] = useState({});
  // const getProfileSession = async () => {
  //   let tempSession = await getSession();
  //   if (tempSession) {
  //     if (typeof tempSession.name !== "object") {
  //       let profileRes = await fetch(
  //         `${backend}/api/getProfileByEmail/${tempSession.user.email}`
  //       );
  //       const response = await profileRes.json();
  //       // window.localStorage.clear();

  //       setProfileData(response[0]);
  //     } else {
  //       setProfileData({});
  //     }
  //   }
  // };

  // const createAnonUser = async () => {
  //   let tempSession = await getSession();
  //   let anonUser = window.localStorage.getItem("anonUser");
  //   if (!anonUser && !tempSession) {
  //     try {
  //       const response = await fetch(
  //         `${backend}/api/createAnonUser`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       anonUser = await response.json();
  //       if (response.status === 200 || response.status === 201) {
  //         window.localStorage.setItem("anonUser", JSON.stringify(anonUser._id));
  //       } else {
  //         console.log("Failed to save Anon credentials");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   getProfileSession();
  //   createAnonUser();
  // }, []);

  // useEffect(() => {
  //   console.log(backend);
  //   console.log(dashboardUrl);
  //   console.log(momzSurveyId);
  //   // dispatch(
  //   //   actions.createEnv({ backend: backend, dashboardUrl:dashboardUrl, momzSurveyId:momzSurveyId })
  //   // );
  // }, [backend,dashboardUrl,momzSurveyId]);

  return (
    <React.Fragment>
      <MainBanner />
      <NewsletterForm backend={backend} />
      <Footer url={`${backend}/api/contactMessage`} />
    </React.Fragment>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  return {
    props: {
      backend: process.env.NEXT_PUBLIC_REACT_APP_BACK_END,
      dashboardUrl: process.env.NEXT_PUBLIC_ADMIN_DASHBOARD,
      momzSurveyId: process.env.NEXT_PUBLIC_MOMZ_SURVEY_ID,
      session: session,
    },
  };
}

export default Index;
