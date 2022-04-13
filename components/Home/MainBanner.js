//React
import React from "react";

//NextJs
import Link from "next/link";

//Redux
import { useSelector } from "react-redux";

//CSS
import classes from "./MainBanner.module.css";

const MainBanner = () => {
  const language = useSelector((state) => state.language);

  return (
    <div className="banner-area">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="banner-item">
              <h1 className={classes.textContainer}>
                <span
                  className={classes.mainPageFont}
                  style={{
                    color: "white",
                    padding: "10px",
                    fontWeight: "600",
                    fontSize: "2.5rem",
                  }}
                >
                  <span className={classes.firstWord}>Reinventing</span>
                  <span className={classes.secondWord}>Mental</span>
                  <span className={classes.thirdWord}>Health</span>
                  <span className={classes.fourthWord}>Care</span>
                </span>
              </h1>
              <div className="common-btn-two">
                <Link href="/surveys">
                  <a>{language.testYourSelf}</a>
                </Link>
                <Link href="/how-it-works">
                  <a>{language.howItWorks}</a>
                </Link>
              </div>
              <div className="banner-right">
                <img
                  src="/images/home-three/home-three-banner1.png"
                  alt="Banner"
                />

                <img
                  src="/images/home-three/Home-Banner-Blue.png"
                  alt="Banner"
                />
                <img
                  src="/images/home-three/Home-Banner-Pink.png"
                  alt="Banner"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
