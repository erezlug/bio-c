import React from "react";
import Link from "next/link";

const Services = () => {
  return (
    <React.Fragment>
      <div className="services-area pb-70">
        <div className="container">
          <div className="section-title-two">
            {/* <span>Services</span> */}
            <h2>Our Services</h2>
          </div>

          <div className="row">
            <div className="col-sm-10 col-lg-4">
              <div className="service-item">
                <div className="d-table">
                  <div className="d-table-cell">
                    <div className="service-front">
                      <i className="fas fa-user-md"></i>
                      <h3>Self Assessment</h3>
                      <p>
                        Fill out the questionnaire for free and get immediately
                        your mental health score. the more details you will
                        provide, you will have a better score for your mental
                        health status.
                      </p>
                    </div>
                    <div className="service-end">
                      <i className="fas fa-user-md"></i>
                      <h3>Self Assessment</h3>
                      <p>
                        Fill out the questionnaire for free and get immediately
                        your mental health score. the more details you will
                        provide, you will have a better score for your mental
                        health status.
                      </p>

                      <Link href="/surveys">
                        <a>Test Yourself</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-10 col-lg-4">
              <div className="service-item">
                <div className="d-table">
                  <div className="d-table-cell">
                    <div className="service-front">
                      <i className="fas fa-clipboard-list"></i>
                      <h3>Realtime Match</h3>
                      <p>
                        In a matter of seconds you will be matched with a mental
                        health professional tailored to your needs.
                      </p>
                    </div>
                    <div className="service-end">
                      <i className="fas fa-clipboard-list"></i>
                      <h3>Realtime Match</h3>
                      <p>
                        In a matter of seconds you will be matched with a mental
                        health professional tailored to your needs.
                      </p>

                      <Link href="/">
                        <a>Coming soon</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-10 col-lg-4">
              <div className="service-item">
                <div className="d-table">
                  <div className="d-table-cell">
                    <div className="service-front">
                      <i className="fas fa-notes-medical"></i>
                      <h3>Online Encounter</h3>
                      <p>
                        Starts an online therapy session with a mental health
                        professional Begin your journey to a better health.
                      </p>
                    </div>
                    <div className="service-end">
                      <i className="fas fa-notes-medical"></i>
                      <h3>Online Encounter</h3>
                      <p>
                        Starts an online therapy session with a mental health
                        professional Begin your journey to a better health.
                      </p>

                      <Link href="/">
                        <a>Coming soon</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Services;
