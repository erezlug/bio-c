import React from "react";

const AboutUs = () => {
  const brand = (
    <>
      <span style={{ color: "#02AEEB" }}>Bio</span>
      <span style={{ color: "#FF318C" }}>markerz</span>
    </>
  );
  return (
    <div className="welcome-area pb-100">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-lg-6">
            <img src="/images/aboutUs.jpeg" alt="Welcome" />
            {/* <div className="welcome-item welcome-left welcome-left-two"></div> */}
          </div>

          <div className="col-lg-6">
            <div className="welcome-item welcome-right">
              <div className="section-title-two">
                {/* <span>About Us</span> */}
                <h1 className="mt-2">
                  <span style={{ fontSize: "2.5rem", color: "#02AEEB" }}>
                    Bio
                  </span>
                  <span style={{ fontSize: "2.5rem", color: "#FF318C" }}>
                    markerz
                  </span>
                </h1>
              </div>
              <ul>
                <li>
                  <i className="fas fa-laptop-code"></i>
                  <div className="welcome-inner">
                    <p>
                      {brand} is an Israeli startup founded in early 2020 during
                      covid-19 epidemic by three Israeli Founders with immense
                      experience in the markets of healthcare policy and
                      management, AI technologies and Software development.
                    </p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-comment-medical"></i>
                  <div className="welcome-inner">
                    <p>
                      {brand} novel approach uses and integrates various data
                      sources that increases precision of diagnostics and
                      clinical decision making.
                    </p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-chart-pie"></i>
                  <div className="welcome-inner">
                    <p>
                      {brand} product is been developing with a collaboration of
                      mental health care practitioners who described the needs
                      and problems of the current diagnostic and treatments in
                      mental health care arena.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
