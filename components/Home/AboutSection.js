import React from "react";
import Link from "next/link";

//Redux
import { useSelector } from "react-redux";

//CSS
import classes from "./MainBanner.module.css";

const AboutSection = () => {
  const language = useSelector((state) => state.language);

  return (
    <div className="about-area pt-100 pb-70">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="about-item">
              <div className="about-left">
                <img src="/images/about1.jpg" alt="About" />
              </div>
              <div
                className=" d-flex justify-content-center"
                style={{ position: "relative", zIndex: "1" }}
              >
                <Link href="/surveys">
                  <a>{language.testYourSelf}</a>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="about-item about-right">
              {/* <img src="/images/about-shape1.png" alt="About" /> */}
              <h1>
                <span
                  className={classes.mainPageFont}
                  style={{
                    backgroundColor: "#02AEEB",
                    color: "white",
                    padding: "5px",
                    fontWeight: "600",
                    fontSize: "3.9rem",
                  }}
                >
                  Reinventing
                </span>
              </h1>
              <h1 style={{ marginLeft: "4rem", padding: "10px" }}>
                <span
                  className={classes.mainPageFont}
                  style={{
                    backgroundColor: "#FF318C",
                    color: "white",
                    padding: "5px",
                    fontWeight: "600",
                    fontSize: "3.9rem",
                  }}
                >
                  Mental Health Care
                </span>
              </h1>
              {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis.{" "}
              </p> */}

              {/* <ul>
                <li>
                  <i className="icofont-check-circled"></i>
                  Take a survey
                </li>
                <li>
                  <i className="icofont-check-circled"></i>
                  Check your mental state
                </li>
                <li>
                  <i className="icofont-check-circled"></i>
                  Get help
                </li>
              </ul> */}

              {/* <Link href="/surveys">
                <a>{language.testYourSelf}</a>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
