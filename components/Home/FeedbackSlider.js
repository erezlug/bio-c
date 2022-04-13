import React from "react";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));

const options = {
  items: 1,
  loop: true,
  margin: 0,
  nav: true,
  dots: false,
  autoplay: false,
  autoplayHoverPause: true,
  navText: [
    "<i className='icofont-simple-left'></i>",
    "<i className='icofont-simple-right'></i>",
  ],
};

const FeedbackSlider = () => {
  const [display, setDisplay] = React.useState(false);

  React.useEffect(() => {
    setDisplay(true);
  }, []);
  return (
    <div className="review-area ptb-100">
      <div className="container">
        {display ? (
          <OwlCarousel
            className="feedback-slider owl-carousel owl-theme"
            {...options}
          >
            <div className="feedback-item">
              <div className="client-img">
                <img src="https://biomarkerz-web.s3-us-west-1.amazonaws.com/client1.png" alt="Feedback" />
                <h3>Adision Smith</h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
              </p>
            </div>

            <div className="feedback-item">
              <div className="client-img">
                <img src="https://biomarkerz-web.s3-us-west-1.amazonaws.com/client2.png" alt="Feedback" />
                <h3>John Cena</h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
              </p>
            </div>

            <div className="feedback-item">
              <div className="client-img">
                <img src="https://biomarkerz-web.s3-us-west-1.amazonaws.com/client3.png" alt="Feedback" />
                <h3>Mac Smith</h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
              </p>
            </div>

            <div className="feedback-item">
              <div className="client-img">
                <img src="https://biomarkerz-web.s3-us-west-1.amazonaws.com/client4.png" alt="Feedback" />
                <h3>Shane Watson</h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
              </p>
            </div>
          </OwlCarousel>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FeedbackSlider;
