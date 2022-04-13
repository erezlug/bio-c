//React
import React from "react";

//CSS
import classes from "./responsive.module.css";

//NextJS
import { useRouter } from "next/router";
const MomPage = () => {
  const hebrew = { display: "flex", "text-align": "right" };
  const router = useRouter();
  return (
    <>
      <div
        className={classes.infoPageBackgroundImage}
        dir="rtl"
        style={{ height: "90.4vh" }}
      >
        <div className={classes.myContainer}>
          <div className={`row m-0`}>
            <div
              className={`col-lg-8 col-md-12`}
              style={{
                display: "flex",
                "text-align": "right",
                marginTop: "8rem",
              }}
            >
              <p className={classes.infoPageRow1}>
                דיכאון בתקופת סביב הלידה הוא שילוב מורכב של שינויים פיזיים,
              </p>
            </div>
          </div>

          <div className="row m-0">
            <div className={`col-lg-8 col-md-12`} style={hebrew}>
              <p className={classes.infoPageRow1}>
                ריגשיים והתנהגותיים המתרחשים אצל נשים מסוימות ליפני/אחרי הלידה.
              </p>
            </div>
          </div>

          <div className="row m-0">
            <div className={`col-lg-8 col-md-12`} style={hebrew}>
              <p className={classes.infoPageRow1}>
                20% מהנשים יחוו דיכאון או חרדה בתקופה שסביב ללידה.
              </p>
            </div>
          </div>

          <div className="row m-0">
            <div className={`col-lg-8 col-md-12`} style={hebrew}>
              <p className={classes.infoPageRow1}>50% מהנשים אינן מאובחנות. </p>
            </div>
          </div>
          <div className="row m-0">
            <div className={`col-lg-8 col-md-12`} style={hebrew}>
              <p className={classes.infoPageRow1}>
                15% מהנשים שמאובחנות עם דכאון, מקבלות טיפול.
              </p>
            </div>
          </div>

          <div className="row m-0">
            <div
              className="col-sm-12"
              style={{
                ...hebrew,
                marginTop: "5rem",
                justifyContent: "space-between",
              }}
            >
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
      </div>
      {/* </div> */}
    </>
  );
};

export default MomPage;
