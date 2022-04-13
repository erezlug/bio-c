import React, { useEffect, useState } from "react";
import Head from "next/head";
import GoTop from "./GoTop";
import Navbar from "./Navbar";

const Layout = ({ children, profileData, getProfileSession }) => {
  const momzSurveyId = process.env.NEXT_PUBLIC_MOMZ_SURVEY_ID;
  const dashboardUrl = process.env.NEXT_PUBLIC_ADMIN_DASHBOARD;

  return (
    <React.Fragment>
      <Head>
        <title>Biomarkerz</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="Biomarkerz" />
        <meta name="og:title" property="og:title" content="Biomarkerz"></meta>
        <meta name="twitter:card" content="Biomarkerz"></meta>
        <link rel="canonical" href="https://biomarkerz.com.com/"></link>
        <link
          rel="preload"
          href="/fonts/trench100free.otf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Navbar
        profile={profileData}
        momzSurveyId={momzSurveyId}
        dashboardUrl={dashboardUrl}
        getProfileSession={getProfileSession}
      />
      {children}
      <GoTop scrollStepInPx="100" delayInMs="10.50" />
    </React.Fragment>
  );
};

export default Layout;
