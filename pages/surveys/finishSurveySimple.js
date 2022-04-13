//React
import React from "react";

//CSS
import classes from "./responsive.module.css";

//Components
import PageBanner from "../../components/Common/PageBanner";

const FinishSurveySimple = () => {
  return (
    <>
      <PageBanner
        cssClassTitle={classes.title}
        cssClassShadow={classes.shadow}
        pageTitle="תודה על השתתפותך במחקר"
        homePageUrl="/"
        homePageText="לעמוד הבית"
        bgImage="page-title-five"
      />
    </>
  );
};

export default FinishSurveySimple;
