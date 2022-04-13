//React
import React, { useState } from "react";

//NextJS
import Link from "next/link";
import { useRouter } from "next/router";

//Next-Auth
import { getSession } from "next-auth/client";

//Redux
import { useDispatch } from "react-redux";
import { CREATE_MESSAGE } from "../redux/types";
import * as authActions from "../redux/actions/authActions";

//Components
import Footer from "../components/_App/Footer";

const SignUp = ({ backEndEnv }) => {
  const date = new Date();
  const todayDate = date.toJSON().slice(0, 10);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({});

  const inputHandler = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (inputs.password !== inputs.confirmPassword) {
      let messageContent = {
        errorMessage: "Passwords don't match please try again",
        title: "Failed to Register",
        buttonText: "Try again",
        buttonColor: "warning",
      };
      dispatch({ type: CREATE_MESSAGE, payload: messageContent });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${backEndEnv}/api/register`,

        {
          method: "POST",
          body: JSON.stringify({
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            password: inputs.password,
            email: inputs.email.toLowerCase(),
            birthDate: inputs.birthDate,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const registerResponse = await response.json();

      if (response.status === 200 || response.status === 201) {
        let messageContent = {
          title: "Success",
          messageRow1: registerResponse.message,
          buttonText: "take me to login",
          buttonColor: "success",
        };
        dispatch({ type: CREATE_MESSAGE, payload: messageContent });
      } else {
        let messageContent = {
          errorMessage: registerResponse.message,
          title: "Failed to register",
          buttonText: "Try again",
          buttonColor: "danger",
        };
        dispatch({ type: CREATE_MESSAGE, payload: messageContent });
      }
    } catch (error) {
      console.log(error);
    }

    // await dispatch(
    //   authActions.register(
    //     inputs.firstName,
    //     inputs.lastName,
    //     inputs.email,
    //     inputs.password,
    //     inputs.birthDate,
    //     backEndEnv
    //   )
    // ).then((result) => {
    //   console.log(result);
    // });

    setIsLoading(false);
    setInputs({});
    router.replace("/sign-in");
  };

  if (isLoading) {
    return (
      <div className="preloader">
        <div className="spinner"></div>
      </div>
    );
  } else {
    return (
      <>
        <div className="signup-area ptb-100">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <img src="/images/signup-bg.jpg" alt="SignUp" />
                {/* <div className="signup-left"></div> */}
              </div>

              <div className="col-lg-6 ptb-100">
                <div className="signup-item">
                  <div className="signup-head">
                    <h2>Sign Up Here</h2>
                    <p>
                      Already have an account?{" "}
                      <Link href="/sign-in">
                        <a>Sign In</a>
                      </Link>
                    </p>
                  </div>

                  <div className="signup-form">
                    <form onSubmit={submitHandler}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First Name"
                              name="firstName"
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last Name"
                              name="lastName"
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Email"
                              required
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="date"
                              name="birthDate"
                              className="form-control"
                              placeholder="Birth Date"
                              min="1900-01-01"
                              max={todayDate}
                              onChange={inputHandler}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Password"
                              required
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="password"
                              name="confirmPassword"
                              className="form-control"
                              placeholder="Confirm Password"
                              required
                              onChange={inputHandler}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="gridCheck"
                                required
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gridCheck"
                              >
                                Yes, I agree with all{" "}
                                <Link href="/privacy-policy">
                                  Terms & Conditions
                                </Link>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="text-center">
                            <button type="submit" className="btn signup-btn">
                              Sign Up
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      backEndEnv: process.env.NEXT_PUBLIC_REACT_APP_BACK_END,
    },
  };
}

export default SignUp;
