import React from "react";
import Link from "next/link";

const PageBanner = ({
  pageTitle,
  homePageUrl,
  homePageText,
  bgImage,
  cssClassTitle,
  cssClassShadow,
}) => {
  return (
    <div className={`page-title-area ${bgImage}`} style={{ height: "90.4vh" }}>
      <div className="d-table">
        <div className="d-table-cell">
          <div className="page-title-item">
            <h2 className={cssClassTitle}>{pageTitle}</h2>
            <ul>
              <li>
                <Link href={homePageUrl}>
                  <a className={cssClassShadow} style={{ fontSize: "2rem" }}>
                    {homePageText}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
