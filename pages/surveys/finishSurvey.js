//React
import React from "react";

//CSS
import classes from "./responsive.module.css";

//Components
import FinishSurveyCards from "../../components/Home/FinishSurveyCards";

const FinishSurvey = () => {
  const hebrew = {
    display: "flex","text-align":"right",
    direction: "rtl",
    justifyContent: "center",
  };

  return (
    <>
      <div
        className="welcome-area page-title-area"
        style={{
          backgroundImage: `url("/images/pexels-artem-podrez-5726797.jpg")`,
          height: "100%",
        }}
      >
        <div className="container-fluid p-2">
          <div className="row m-0">
            <div className="col-lg-12">
              <div className="welcome-item welcome-right">
                <h2 className={`mt-5 ${classes.title}`} style={hebrew}>
                  תודה על השתתפותך במחקר
                </h2>
                <br />
                <h3 className={classes.subTitle} style={hebrew}>
                  על פי בדיקה ראשונית, אנו ממליצים לך לפנות להמשך טיפול מקצועי{" "}
                </h3>
                <h3 className={classes.subTitle} style={hebrew}>
                  לפנייך מספר מוקדים אשר יכולים לעזור
                </h3>
                <br />

                <FinishSurveyCards />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
// export async function getServerSideProps() {
//   return {
//     props: {
//       momzSurveyId: process.env.NEXT_PUBLIC_MOMZ_SURVEY_ID,
//     },
//   };
// }

export default FinishSurvey;
