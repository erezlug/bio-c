import React, { useState } from "react";

import { GoogleLogin } from "react-google-login";
import { useGoogleLogin } from "react-google-login";

// import axios from 'axios';
// import FacebookLogin from 'react-facebook-login';
// import TopHeader from "../components/_App/TopHeader";

/** Redux */
import { useDispatch } from "react-redux";
// import * as authActions from "../redux/actions/authActions";
import { CREATE_MESSAGE } from "../redux/types";

//Next
import { useRouter } from "next/router";
import Link from "next/link";

//Next-Auth
import { signIn, getSession, signOut } from "next-auth/client";

/** Validators */
// import {
//   VALIDATOR_EMAIL,
//   VALIDATOR_MAXLENGTH,
//   VALIDATOR_MINLENGTH,
//   VALIDATOR_REQUIRE,
// } from "../utils/validators";
import Footer from "../components/_App/Footer";

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({});

  const inputHandler = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  // const signinWithProvider = async (provider) => {
  //   setIsLoading(true);
  //   await signIn(provider, { callbackUrl: "/" });
  //   // const mySession = await getSession();
  //   // if (mySession) {
  //   //   console.log(mySession);
  //   // }
  // };
  // const checkSession =async() => {
  //   let tempSession=await getSession();
  //   if (tempSession){
  //   router.replace("/");
  //   }
  // }
  // useEffect(() => {
  //   checkSession();
  // }, [])
  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    await signIn("credentials", {
      redirect: false,
      email: inputs.email.toLowerCase(),
      password: inputs.password,
    });
    //A session is given back.

    const session = await getSession();
    if (session) {
      if (session.user.name.error) {
        let messageContent = {
          errorMessage: session.user.name.error,
          title: "Failed to login",
          buttonText: "Try again",
          buttonColor: "danger",
        };

        dispatch({ type: CREATE_MESSAGE, payload: messageContent });
        signOut({ redirect: false });
        setIsLoading(false);
      } else {
        // router.push('/');
        window.location.replace(window.location.origin);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="preloader">
        <div className="spinner"></div>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className="signup-area">
          <div className="container-fluid-signIn">
            <div className="row">
              <div className="col-lg-6"></div>
              <div className="col-lg-6 ">
                <div className="signup-item">
                  <div className="signup-head pt-2">
                    <h2>Login Here</h2>
                    <p>
                      Didn't you account yet?{" "}
                      <Link href="/sign-up">
                        <a>Sign Up Here</a>
                      </Link>
                    </p>
                  </div>
                  <div className="signup-form">
                    <form onSubmit={submitHandler}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Your Email"
                              required
                              onChange={inputHandler}
                            />
                            {/* <p>error</p> */}
                          </div>
                        </div>
                        <div className="col-lg-12">
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

                        <div className="col-lg-12">
                          <div className="form-group">
                            <div className="forgot-pass">
                              <a href="#">Forgot Password?</a>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-outline-dark signup-btn"
                            >
                              Login
                            </button>
                          </div>
                          <div className="auth-login-btn">
                            <button
                              className="btn btn-outline-dark signup-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                signIn("google");
                              }}
                            >
                              <img
                                width="20px"
                                style={{
                                  marginBottom: "3px",
                                  marginRight: "26px",
                                }}
                                alt="Google sign-in"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                              />
                              Login with Google
                            </button>

                            <button
                              className="btn btn-outline-dark signup-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                signIn("facebook");
                              }}
                            >
                              <img
                                width="20px"
                                style={{
                                  marginBottom: "3px",
                                  marginRight: "10px",
                                }}
                                alt="Facebook sign-in"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_(2019).svg"
                              />
                              Login with Facebook
                            </button>
                          </div>

                          {/* <a id="logout" href="#" onclick="logout()">
                            Logout
                          </a> */}
                        </div>
                      </div>
                    </form>
                    <div className="mt-3">
                      {/* <form
                        action="http://localhost:3000/api/auth/signin/google"
                        method="POST"
                      >
                        <input
                          type="hidden"
                          name="csrfToken"
                          value="6540f8902684bb5c9e26cf5a4b6873327e5cfb6a68972de3689196409feac6fc"
                        />
                        <input
                          type="hidden"
                          name="callbackUrl"
                          value="http://localhost:3000/sign-in"
                        />
                        <button type="submit" class="button">
                          Sign in with Google
                        </button>
                      </form>
                      <form
                        action="http://localhost:3000/api/auth/signin/facebook"
                        method="POST"
                      >
                        <input
                          type="hidden"
                          name="csrfToken"
                          value="6540f8902684bb5c9e26cf5a4b6873327e5cfb6a68972de3689196409feac6fc"
                        />
                        <input
                          type="hidden"
                          name="callbackUrl"
                          value="http://localhost:3000/sign-in"
                        />
                        <button type="submit" class="button">
                          Sign in with Facebook
                        </button>
                      </form> */}
                    </div>
                  </div>
                </div>
                {/* <div>
                  <a href='http://localhost:5000/api/auth/facebook'>log in with facebook</a>
                </div> */}
                <div>
                  {/* <div> */}
                  {/* <h3>login with facebook</h3> */}
                  {/* <FacebookLogin
                      appId="3703065476448958"
                      autoLoad={false}
                      fields="name,email,picture"
                      // scope="public_profile"
                      // onClick={componentClicked}
                      callback={responseFacebook} /> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
};

export default SignIn;
