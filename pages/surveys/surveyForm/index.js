import React from "react";
import PostSurveyForm from "../../../components/Contact/PostSurveyForm";
// import Footer from "../../../components/_App/Footer";

//Redux
import { useSelector } from "react-redux";
const Index = () => {
  const surveyResultData = useSelector((state) => state.linkTo);
  const backend = process.env.NEXT_PUBLIC_REACT_APP_BACK_END;
  if (backend) {
    return (
      <React.Fragment>
        <PostSurveyForm
          url={`${backend}/api/addPostSurveyForm`}
          afterSurveyLink={surveyResultData.afterSurveyLink}
          surveyId={surveyResultData.surveyId}
          urlHistory={surveyResultData.urlHistory}
        />
        {/* <Footer /> */}
      </React.Fragment>
    );
  } else {
    return(<div></div>);
  }
};
// export async function getServerSideProps() {
//   return {
//     props: {
//       backend: process.env.NEXT_PUBLIC_REACT_APP_BACK_END
//     },
//   };

// }
export default Index;
