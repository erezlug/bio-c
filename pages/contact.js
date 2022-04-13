import React from "react";
import ContactForm from "../components/Contact/ContactForm";
import GoogleMap from "../components/Contact/GoogleMap";
import Footer from "../components/_App/Footer";

const Contact = ({ backend }) => {
  return (
    <React.Fragment>
      <ContactForm url={`${backend}/api/contactMessage`} />
      <GoogleMap />
      <Footer />
    </React.Fragment>
  );
};
export async function getServerSideProps() {
  return {
    props: {
      backend: process.env.NEXT_PUBLIC_REACT_APP_BACK_END,
    },
  };
}
export default Contact;
