import React from "react";
import Link from "next/link";

const SurveyComplete = () => {
  return (
    <React.Fragment>
      <div className="container mt-5">
        {/* <div className="error-area"> */}
        {/* <div className="error-item"> */}
        <div className="d-table">
          <div className="d-table-cell">
            <div className="error-text">
              <h1>Congratulations!</h1>
              <p>You have completed the survey</p>
              {/* <span>Oops! The page you are looking for does not exit. it might been moved or deleted.</span> */}

              <Link href="/">
                <a>Return to Home</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </React.Fragment>
  );
};

export default SurveyComplete;
