//React
import React, { useState } from "react";

//React-Form
import { useForm } from "react-hook-form";

//Next
import Link from "next/link";

//Axios
import axios from "axios";

//Swee Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const alertContent = (resMessage, error) => {
  MySwal.fire({
    title: "Great!",
    text: resMessage,
    icon: error ? "error" : "success",
    timer: 8000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

//Initial state for feedback form
const INITIAL_STATE = {
  name: "",
  email: "",
  subject: "",
  text: "",
};
const Footer = (props) => {
  const currentYear = new Date().getFullYear();
  const [contact, setContact] = useState(INITIAL_STATE);
  const { handleSubmit } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSubmit = async (e) => {
    // e.preventDefault();
    try {
      const { name, email, number, subject, text } = contact;
      const payload = { name, email, number, subject, text };

      await axios
        .post(props.url, { payload })
        .then(async (res) => {
          if (res.status === 200) {
            alertContent(res.data.message);
          } else {
            alertContent("An error occurred", true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <footer className="pt-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-5">
              <div className="footer-item">
                <div className="footer-contact">
                  <h3>Contact Us</h3>
                  <ul>
                    <li>
                      <i className="far fa-envelope"></i>
                      <a href="mailto:info@biomarkerz.com">
                        info@biomarkerz.com
                      </a>
                      <a href="mailto:sales@biomarkerz.com">
                        sales@biomarkerz.com
                      </a>
                    </li>
                    <li>
                      <i className="fas fa-mobile-alt"></i>
                      <a href="tel:+972542324640">Call: +972 542 324 640</a>
                    </li>
                    <li>
                      <i className="fas fa-map-marker-alt"></i>
                      Eli Cohen 11,
                      <br />
                      Tel-aviv, Israel.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="footer-item">
                <div className="footer-quick">
                  <h3>Quick Links</h3>
                  <ul>
                    <li>
                      <Link href="/about">
                        <a>About us</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/how-it-works">
                        <a>How It Works</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy">
                        <a>Privacy Policy</a>
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="/faq">
                        <a>Faq</a>
                      </Link>
                    </li> */}
                    <li>
                      <Link href="/contact">
                        <a>Contact us</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="footer-item">
                <div className="footer-feedback">
                  <h3>Feedback</h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        required
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        required
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        required
                        name="subject"
                        placeholder="Subject"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="your_message"
                        rows="3"
                        required
                        name="text"
                        placeholder="Write your message..."
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="text-left">
                      <button type="submit" className="btn feedback-btn">
                        SUBMIT
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="copyright-area">
        <div className="container">
          <div className="copyright-item">
            <p>
              Copyright @{currentYear}{" "}
              <a href="https://www.biomarkerz.com/" target="_blank">
                Biomarkerz
              </a>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
