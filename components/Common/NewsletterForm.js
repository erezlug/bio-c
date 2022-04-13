import React, { useEffect, useState } from "react";

const NewsletterForm = ({ backend }) => {
  const [message, setMessage] = useState(null);
  const [alertClass, setAlertClass] = useState("");
  const [inputs, setInputs] = useState({});
  const [response, setRespone] = useState(null);
  useEffect(() => {
    if (response) {
      response.json().then((msgResponse) => {
        switch (response.status) {
          case 200:
            setAlertClass("alert alert-success");
            break;
          case 422:
            setAlertClass("alert alert-warning");
            break;
          case 500:
            setAlertClass("alert alert-danger");
            break;

          default:
            break;
        }
        setMessage(msgResponse.message);
        setRespone(null);
      });
    }
  }, [response]);

  const inputHandler = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const subscribeHandler = async (event) => {
    event.preventDefault();
    const subscriberResponse = await fetch(
      `${backend}/api/subscribeToMailingList`,

      {
        method: "POST",
        body: JSON.stringify({
          email: inputs.email.toLowerCase(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // const messageResponse = await subscriberResponse.json();
    setRespone(subscriberResponse);
  };
  if (message && alertClass !== "") {
    return (
      <div className="newsletter-area ptb-100">
        <div className="container">
          <div className="row newsletter-wrap align-items-center">
            <div className="col-lg-6">
              <div className="newsletter-item">
                <h2>Join Our Newsletter</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod.
                </p>
              </div>
              <div className={alertClass}>{message}</div>
            </div>
            <div className="col-lg-6">
              <div className="newsletter-item">
                <div className="newsletter-form">
                  <form className="newsletter-form" onSubmit={subscribeHandler}>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Your Email"
                      name="email"
                      required
                      onChange={inputHandler}
                    />

                    <button className="btn newsletter-btn" type="submit">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="newsletter-area ptb-100">
        <div className="container">
          <div className="row newsletter-wrap align-items-center">
            <div className="col-lg-6">
              <div className="newsletter-item">
                <h2>Join Our Newsletter</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="newsletter-item">
                <div className="newsletter-form">
                  <form className="newsletter-form" onSubmit={subscribeHandler}>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Your Email"
                      name="email"
                      required
                      onChange={inputHandler}
                    />

                    <button className="btn newsletter-btn" type="submit">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default NewsletterForm;
