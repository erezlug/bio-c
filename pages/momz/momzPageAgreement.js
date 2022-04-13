//React
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

//CSS
//CSS
import classes from "../surveys/responsive.module.css";

//Components
import AcceptModal from "../../components/Modal/AcceptModal";

//NextJs
import Link from "next/link";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../redux/actions/languageActions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const alertContent = (resMessage, error) => {
  MySwal.fire({
    title: "מצויין",
    text: resMessage,
    icon: error ? "error" : "success",
    timer: 8000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

// Form initial state
const INITIAL_STATE = {
  text: "",
};

const MomPage = () => {
  const backEndEnv = useSelector(state => state.user.backend)
  const momzSurveyId = useSelector(state => state.user.momzSurveyId)
  const [contact, setContact] = useState(INITIAL_STATE);
  const { handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeLanguage("hebrew"));
  }, []);

  const hebrew = {
    display: "flex","text-align":"right",
    direction: "rtl",
    justifyContent: "center",
  };
  const [agree, setAgree] = useState(true);
  const [modalState, setModalState] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    // e.preventDefault();
    try {
      const { text } = contact;
      await axios
        .post(`${backEndEnv}/api/momzAgreementFeedback`, { text })
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

  const setModalHandler = (bool) => {
    if (!bool) {
      setAgree(bool);
    }
    setModalState((prev) => {
      return !prev;
    });
  };
  return (
    <>
      <AcceptModal
        isOpen={modalState}
        setModal={setModalHandler}
        momzSurveyId={momzSurveyId}
      />
      <div
        style={{
          backgroundImage: `url("/images/pexels-pixabay-160624.jpg")`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* <div className="welcome-area"> */}
        <div className="container-fluid p-2">
          <div className="row m-0">
            <div className="col-lg-12">
              <div className="welcome-item welcome-right">
                <h2 className={`mt-5 ${classes.title}`} style={hebrew}>
                  תיעוד הסכמה
                </h2>
                <br />
                <h3 className={classes.subTitle} style={hebrew}>
                  נא לסמן את האחת משתי האפשרויות הבאות, המציינת כי קראתי את
                  הטופס של מסמך זה,
                </h3>
                <h3 className={classes.subTitle} style={hebrew}>
                  שבו הוסבר לי על המחקר ואני מסמיכה להשתתף בו
                </h3>
                <br />
                <div
                  className="row"
                  style={{
                    display: "flex","text-align":"right",
                    direction: "rtl",
                    justifyContent: "center",
                  }}
                >
                  <form className="mr-5">
                    <div className="row" style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex","text-align":"right",
                          direction: "rtl",
                          justifyContent: "end",
                        }}
                      >
                        <input
                          type="radio"
                          id="1"
                          name="drone"
                          value="מאשרת"
                          style={{ marginTop: "10px" }}
                          onChange={() => setAgree(true)}
                          checked={agree}
                        ></input>
                        <h4
                          className={classes.subTitle}
                          htmlFor="1"
                          style={{ marginRight: "0.5rem" }}
                        >
                          מאשרת
                        </h4>
                      </div>
                      <div
                        style={{
                          display: "flex","text-align":"right",
                          direction: "rtl",
                          justifyContent: "end",
                        }}
                      >
                        <input
                          type="radio"
                          id="2"
                          name="drone"
                          value="לא מאשרת"
                          style={{ marginTop: "10px" }}
                          checked={!agree}
                          onChange={() => setAgree(false)}
                        />
                        <h4
                          className={classes.subTitle}
                          htmlFor="2"
                          style={{ marginRight: "0.5rem" }}
                        >
                          לא מאשרת
                        </h4>
                      </div>
                    </div>
                  </form>
                </div>

                <div
                  className={`row banner-item ${!agree && "mt-5"}`}
                  style={{
                    display: "flex","text-align":"right",
                    height: "10rem",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  {agree ? (
                    <div className="common-btn-two">
                      <Link href={`/momz/momzPageAgreement`}>
                        {/* 608fe2515efacc55d89d1bc8 */}
                        <a
                          style={{
                            fontSize: "1.5rem",
                            color: "white",
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                          }}
                          onClick={setModalHandler}
                        >
                          הצג מסמך
                        </a>
                      </Link>
                      <Link href={`/momz/${momzSurveyId}`}>
                        {/* 608fe2515efacc55d89d1bc8 */}
                        <a
                          style={{
                            fontSize: "1.5rem",
                            color: "white",
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                          }}
                        >
                          מעבר לשאלון
                        </a>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div className="form-group">
                              <textarea
                                dir="rtl"
                                name="text"
                                cols="30"
                                rows="5"
                                placeholder="נודה לך אם תשתפי אותנו בהחלטתך"
                                className="form-control"
                                value={contact.text}
                                onChange={handleChange}
                                // ref={register({ required: true })}
                              />
                              <div
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.text && "Text body is required."}
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12 col-sm-12 mb-5 d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">
                              שלח
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      {/* </div> */}
    </>
  );
};
export async function getServerSideProps() {
  return {
    props: {
      momzSurveyId: process.env.NEXT_PUBLIC_MOMZ_SURVEY_ID,
      backEndEnv: process.env.NEXT_PUBLIC_REACT_APP_BACK_END,
    },
  };
}

export default MomPage;
