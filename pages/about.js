import React from "react";
import TestimonialSlider from "../components/Common/TestimonialSlider";
import AboutUs from "../components/Home/AboutUs";
import Footer from "../components/_App/Footer";

const About = () => {
  return (
    <React.Fragment>
      <div className="mt-5"></div>
      <AboutUs />
      {/* <TestimonialSlider /> */}
      <Footer />
    </React.Fragment>
  );
};

export default About;
