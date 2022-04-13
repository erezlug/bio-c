//React
import React, { useEffect } from "react";

//CSS
import classes from "./responsive.module.css";

//NextJS
import { useRouter } from "next/router";

//Redux
import { useDispatch } from "react-redux";
import { changeLanguage } from "../../redux/actions/languageActions";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
const MomPage = () => {
  const router = useRouter();
  const hebrew = {
    display: "flex",
    "text-align": "right",
    direction: "rtl",
  };
  const dispatch = useDispatch();
  const mobileStyle = {
    width: "99.2vw",
    height: "100vh",
    backgroundImage: "url(/images/BackgroundImageMomzPage.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  useEffect(() => {
    dispatch(changeLanguage("hebrew"));
  }, []);
  return (
    <>
      <div style={isMobile ? mobileStyle : {}}>
        <div
          style={{
            position: "absolute",
            width: "99.2vw",
          }}
          dir="rtl"
        >
          <BrowserView>
            <video autoPlay="true" muted loop id={classes.myVideo}>
              <source src="/videos/BackgoundVideo.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </BrowserView>

          <div className="row">
            <div className="col-sm-10 p-0" style={hebrew}>
              <p
                className={`${classes.line1}`}
                style={{ backgroundColor: "#02AEEB" }}
              >
                חברת ביומרקרז ובית החולים הדסה עין כרם מזמינים אותך להשתתף במחקר
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-11 p-0" style={hebrew}>
              <p
                className={`${classes.line2}`}
                style={{ backgroundColor: "#02AEEB" }}
              >
                שיסייע בפיתוח טכנולוגיות חדשניות לאבחון דכאון וחרדה לפני ואחרי
                הלידה
              </p>
            </div>
          </div>
          <div className={`row ${classes.buttonRow}`}>
            <div style={hebrew}>
              <button
                className={classes.buttonRowBtn}
                onClick={() => {
                  router.push("/momz/momzPageAgreement");
                }}
              >
                השתתפות במחקר
              </button>
            </div>
          </div>
        </div>
        {/* <div className="welcome-area">
        <div className="container-fluid p-2">
          <div className="row m-0">
            <div className="col-md-3 ">
              <img src="/images/momPage.jpeg" alt="Welcome" />
            </div>

            <div className="col-md-9">
              <div className="welcome-item welcome-right">
                <h3 className={`mt-5 ${classes.textResize}`} style={hebrew}>
                  חברת ביומרקרז מפתחת באמצעות בינה מלאכותית סמנים ביולוגים
                  דיגיטליים המותאמים אישית לאבחון דכאון
                </h3>
                <h3 className={classes.textResize} style={hebrew}>
                  וחרדה לפני ואחרי הלידה
                </h3>
                <br />
                <h3 className={classes.textResize} style={hebrew}>
                  בעזרתך, נקים מאגר מידע אנונימי, שיכיל גורמי סיכון לדיכאון
                  וחרדה בקרב נשים בהריון ואחרי הלידה.
                </h3>
                <h3 className={classes.textResize} style={hebrew}>
                  האבחון יבוצע באופן עצמוני באתר ייחודי ויהיה זמין לכל אם, בכל
                  מקום בארץ ובעולם , חינם.
                </h3>
                <br />

                <h3 className={classes.textResize} style={hebrew}>
                  המחקר נערך בשיתוף פעולה עם המרפאה לבריאות הנפש של האישה, בית
                  החולים הדסה עין כרם ירושלים.
                </h3>
                <h3 className={classes.textResize} style={hebrew}>
                  לצורך חיסיון הנתונים, המחקר אושר על ידי וועדת הילסינקי של בית
                  החולים הדסה ירושלים.
                </h3>
                <div
                  className="row banner-item mt-5"
                  style={{
                    display: "flex","text-align":"right",
                    height: "10rem",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <div className="common-btn-two">
                    <Link href="/momz/momzPageInfo">
                      <a className={classes.infoButton}>מידע על המחקר</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default MomPage;
