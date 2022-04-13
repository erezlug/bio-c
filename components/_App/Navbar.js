//React
import React, { useState, useEffect } from "react";

//NextJS
import Link from "../../utils/ActiveLink";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { changeLanguage } from "../../redux/actions/languageActions";

const Navbar = ({ profile, getProfileSession }) => {
  const router = useRouter();
  const [menu, setMenu] = useState(true);
  const [navStyle, setNavStyle] = useState({});
  const language = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const [session, loading] = useSession();
  const [userLink, setUserLink] = useState(null);
  const [userProviderLink, setUserProviderLink] = useState(null);
  // const dashboardUrl = useSelector(state => state.auth.myEnv.dashboardUrl);
  // const momzSurveyId = useSelector(state => state.auth.myEnv.momzSurveyId);
  const dashboardUrl = process.env.NEXT_PUBLIC_ADMIN_DASHBOARD;
  const momzSurveyId = process.env.NEXT_PUBLIC_MOMZ_SURVEY_ID;

  const [hebStyle, setHebStyle] = useState(
    language.locale === "he" ? { textAlign: "right" } : {}
  );
  const [textDir, setTextDir] = useState(
    language.locale === "he" ? "rtl" : "ltr"
  );
  const toggleNavbar = () => {
    setMenu(!menu);
  };

  const logOut = async () => {
    // await signOut({ redirect: false });
    await signOut();

    getProfileSession();
  };

  const changeLang = () => {
    if (language.language === "עברית") {
      dispatch(changeLanguage("english"));
      // setLang(textContentEnglish);
    } else {
      dispatch(changeLanguage("hebrew"));
      // setLang(textContentHebrew);
    }
  };

  useEffect(() => {
    if (window.innerWidth > 900) {
      setNavStyle({ marginLeft: "20rem" });
    } else {
      setNavStyle({});
    }
  }, []);

  useEffect(() => {
    if (language.locale === "he") {
      setHebStyle({ textAlign: "right" });
      setTextDir("rtl");
    } else {
      setHebStyle({});
      setTextDir("ltr");
    }
  }, [language]);

  const momNavStyle = {
    fontWeight: "bold",
    fontSize: "1rem",
    paddingTop: "1rem",
  };

  const classOne = menu
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  useEffect(() => {
    setUserLink(
      session ? (
        session.user.name.isAdmin ? (
          <li className="nav-item">
            <Link href="/#">
              <a
                onClick={(e) => e.preventDefault()}
                className="nav-link dropdown-toggle"
              >
                {session.user.name.firstName}
              </a>
            </Link>

            <ul className="dropdown-menu" dir={textDir}>
              <li className="nav-item" style={hebStyle}>
                <Link href={`${dashboardUrl}`}>
                  <a style={{ cursor: "pointer" }} className="nav-link">
                    {language.userDropdown.adminPanel}
                  </a>
                </Link>
              </li>
              <li className="nav-item" style={hebStyle}>
                <Link href={`${`${dashboardUrl}`}/admin/creator`}>
                  <a style={{ cursor: "pointer" }} className="nav-link">
                    {language.userDropdown.createSurvey}
                  </a>
                </Link>
              </li>
              <li className="nav-item" style={hebStyle}>
                <Link href={`/user/update-profile/${session.user.name.userId}`}>
                  <a style={{ cursor: "pointer" }} className="nav-link">
                    {language.userDropdown.updateProfile}
                  </a>
                </Link>
              </li>
              <li className="nav-item" style={hebStyle}>
                <Link href={`/user/survey-results/${session.user.name.userId}`}>
                  <a style={{ cursor: "pointer" }} className="nav-link">
                    {language.userDropdown.surveyResults}
                  </a>
                </Link>
              </li>
            </ul>
          </li>
        ) : (
          <li className="nav-item">
            <Link href="/#">
              <a
                onClick={(e) => e.preventDefault()}
                className="nav-link dropdown-toggle"
              >
                {typeof session.user.name === "object" &&
                  session.user.name.firstName &&
                  session.user.name.firstName.split(" ")[0]}
              </a>
            </Link>
            <ul className="dropdown-menu" dir={textDir}>
              <li className="nav-item" style={hebStyle}>
                <Link href={`/user/update-profile/${session.user.name.userId}`}>
                  <a style={{ cursor: "pointer" }} className="nav-link">
                    {language.userDropdown.updateProfile}
                  </a>
                </Link>
              </li>
              <li className="nav-item" style={hebStyle}>
                <Link href={`/user/survey-results/${session.user.name.userId}`}>
                  <a style={{ cursor: "pointer" }} className="nav-link">
                    {language.userDropdown.surveyResults}
                  </a>
                </Link>
              </li>
            </ul>
          </li>
        )
      ) : null
    );
    setUserProviderLink(
      profile !== {} ? (
        profile.isAdmin ? (
          <li className="nav-item">
            <Link href="/#">
              <a
                onClick={(e) => e.preventDefault()}
                className="nav-link dropdown-toggle"
              >
                {profile.firstName}
              </a>
            </Link>

            <ul className="dropdown-menu" dir={textDir}>
              <li className="nav-item" style={hebStyle}>
                <Link href={`${dashboardUrl}`}>
                  <a style={{ cursor: "pointer" }} className="nav-link">
                    {language.userDropdown.adminPanel}
                  </a>
                </Link>
              </li>
              <li
                className="nav-item"
                style={
                  language.locale === "he"
                    ? { display: "flex", textAlign: "right" }
                    : null
                }
              >
                <Link href={`${dashboardUrl}/admin/creator`}>
                  <a style={{ cursor: "pointer" }} className="nav-link">
                    {language.userDropdown.createSurvey}
                  </a>
                </Link>
              </li>
              <li className="nav-item" style={hebStyle}>
                <Link href={`/user/survey-results/${profile._id}`}>
                  <a style={{ cursor: "pointer" }} className="nav-link">
                    {language.userDropdown.surveyResults}
                  </a>
                </Link>
              </li>
            </ul>
          </li>
        ) : (
          <li className="nav-item">
            <Link href="/#">
              <a
                onClick={(e) => e.preventDefault()}
                className="nav-link dropdown-toggle"
              >
                {profile.firstName}
              </a>
            </Link>
            <ul className="dropdown-menu" dir={textDir}>
              {/* <li className="nav-item">
                <Link href={`/user/update-profile/${profile._id}`}>
                  <a style={{ cursor: "pointer" }} className="nav-link">
                    Update Profile
                  </a>
                </Link>
              </li> */}
              <li className="nav-item" style={hebStyle}>
                <Link href={`/user/survey-results/${profile._id}`}>
                  <a style={{ cursor: "pointer" }} className="nav-link">
                    {language.userDropdown.surveyResults}
                  </a>
                </Link>
              </li>
            </ul>
          </li>
        )
      ) : null
    );
  }, [session, profile]);

  // if (loading) {
  //   return (
  //     <div className="preloader">
  //       <div className="spinner"></div>
  //     </div>
  //   );
  // } else {
  if (
    router.asPath !== "/momz/momPage" &&
    router.asPath !== "/momz/momzPageInfo" &&
    router.asPath !== "/momz/momzPageAgreement" &&
    router.asPath !== "/surveys/finishSurvey" &&
    router.asPath !== "/surveys/finishSurveySimple" &&
    router.asPath !== `/momz/${momzSurveyId}`
  ) {
    return (
      <div id="navbar" className="navbar-area sticky-top">
        <div className="main-nav">
          <div className="container">
            <nav className="navbar navbar-expand-xl navbar-light">
              <Link href="/">
                <a onClick={toggleNavbar} className="navbar-brand">
                  <img
                    src="/images/brand/biomarkerz-logo.png"
                    alt="biomarkerz"
                    height="55px"
                    width="170"
                  />
                </a>
              </Link>

              <button
                onClick={toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bar top-bar"></span>
                <span className="icon-bar middle-bar"></span>
                <span className="icon-bar bottom-bar"></span>
              </button>

              <div
                className={classOne}
                id="navbarSupportedContent"
                style={navStyle}
              >
                <ul className="navbar-nav" dir={textDir}>
                  <li className="nav-item" style={hebStyle}>
                    <Link href="/surveys" activeClassName="active">
                      <a className="nav-link">{language.testYourSelf}</a>
                    </Link>
                  </li>
                  <li className="nav-item" dir={textDir}>
                    <Link href="/#">
                      <a
                        onClick={(e) => e.preventDefault()}
                        className="nav-link dropdown-toggle"
                        style={hebStyle}
                      >
                        {language.brand}{" "}
                      </a>
                    </Link>

                    <ul className="dropdown-menu" dir={textDir}>
                      <li
                        className="nav-item"
                        style={
                          language.locale === "he"
                            ? { display: "flex", textAlign: "right" }
                            : null
                        }
                      >
                        <Link href="/about" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            {language.brandDropdown.aboutUs}
                          </a>
                        </Link>
                      </li>

                      <li
                        className="nav-item"
                        style={
                          language.locale === "he"
                            ? { display: "flex", textAlign: "right" }
                            : null
                        }
                      >
                        <Link href="/how-it-works" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            {language.brandDropdown.howItWorks}
                          </a>
                        </Link>
                      </li>

                      <li
                        className="nav-item"
                        style={
                          language.locale === "he"
                            ? { display: "flex", textAlign: "right" }
                            : null
                        }
                      >
                        <Link href="/privacy-policy" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            {language.brandDropdown.privacyPolicy}
                          </a>
                        </Link>
                      </li>

                      <li
                        className="nav-item"
                        style={
                          language.locale === "he"
                            ? { display: "flex", textAlign: "right" }
                            : null
                        }
                      >
                        <Link href="/contact" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            {language.brandDropdown.contactUs}
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item" dir={textDir}>
                    <Link href="/#">
                      <a
                        onClick={(e) => e.preventDefault()}
                        className="nav-link dropdown-toggle"
                        style={hebStyle}
                      >
                        {language.language === "english" ? "language" : "שפה"}{" "}
                      </a>
                    </Link>

                    <ul className="dropdown-menu" dir={textDir}>
                      <li className="nav-item" style={hebStyle}>
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={changeLang}
                          className="nav-link"
                          style={hebStyle}
                        >
                          {language.language === "english"
                            ? "עברית"
                            : "English"}
                        </a>
                      </li>
                    </ul>
                  </li>
                  {session ? (
                    session.user.name.error ? (
                      <li className="nav-item" style={hebStyle}>
                        <Link href="/sign-in" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            {language.signIn}
                          </a>
                        </Link>
                      </li>
                    ) : typeof session.user.name === "object" ? (
                      userLink
                    ) : (
                      userProviderLink
                    )
                  ) : (
                    <li className="nav-item" style={hebStyle}>
                      <Link href="/sign-in" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          {language.signIn}
                        </a>
                      </Link>
                    </li>
                  )}

                  {/* {session ? (
                    session.user.name.firstName ? (
                      <li className="nav-item" style={hebStyle}>
                        <Link
                          style={{ cursor: "pointer" }}
                          className="nav-link"
                          href="/"
                        >
                          <a onClick={logOut}>{language.signOut}</a>
                        </Link>
                      </li>
                    ) : null
                  ) : null} */}
                  {session ? (
                    <li className="nav-item" style={hebStyle}>
                      <Link
                        style={{ cursor: "pointer" }}
                        className="nav-link"
                        href="/"
                      >
                        <a onClick={logOut}>{language.signOut}</a>
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
    // }
  } else {
    return (
      <div id="navbar" className="navbar-area sticky-top">
        <div className="main-nav">
          <div className="container">
            <nav className="navbar navbar-expand-xl navbar-light">
              <Link href={router.asPath}>
                <a onClick={toggleNavbar} className="navbar-brand">
                  <img
                    src="/images/brand/momz-logo.png"
                    alt="biomarkerz"
                    height="50px"
                  />
                </a>
              </Link>

              <button
                onClick={toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bar top-bar"></span>
                <span className="icon-bar middle-bar"></span>
                <span className="icon-bar bottom-bar"></span>
              </button>

              <div
                className={classOne}
                id="navbarSupportedContent"
                // style={navStyle}
              >
                <ul className="navbar-nav" dir={textDir}>
                  <li className="nav-item" style={hebStyle}>
                    <Link href="/surveys" activeClassName="active">
                      <a className="nav-link" style={momNavStyle}>
                        {/* שמירת סודיות ופרטיות */}
                      </a>
                    </Link>
                  </li>
                </ul>
                <ul className="navbar-nav" dir={textDir}>
                  <li className="nav-item" style={hebStyle}>
                    <Link
                      href="/momz/momzPageAgreement"
                      activeClassName="active"
                    >
                      <a className="nav-link" style={momNavStyle}>
                        השתתפות במחקר
                      </a>
                    </Link>
                  </li>
                </ul>
                {/* <ul className="navbar-nav">
                  <li className="nav-item" style={hebStyle}>
                    <Link href="/" activeClassName="active">
                      <a className="nav-link" style={momNavStyle}>
                        מידע על המחקר
                      </a>
                    </Link>
                  </li>
                </ul> */}
                <ul className="navbar-nav" dir={textDir}>
                  <li className="nav-item" style={hebStyle}>
                    <Link href="/momz/momzPageInfo" activeClassName="active">
                      <a className="nav-link" style={momNavStyle}>
                        רקע כללי
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
