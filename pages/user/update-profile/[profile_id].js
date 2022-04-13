import React, { useEffect, useState } from "react";
import axios from "axios";
import FormModal from "../../../components/Modal/FormModal";
import { signIn, signOut } from "next-auth/client";
import { useRouter } from "next/router";

const UpdateProfile = ({ profile, params, backend }) => {
  const router = useRouter();
  const [user, setUser] = useState(profile);
  const [message, setMessage] = useState(false);
  const [load, setLoad] = useState(false);
  const [errMessage, setErrMessage] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((preVal) => {
      return { ...preVal, [name]: value };
    });
  };
  console.log(user);
  const onSubmit = (e) => {
    e.preventDefault();
    setMessage(true);
  };

  const update = async () => {
    setLoad(true);
    await axios
      .post(`${backend}/api/updateProfile/${user._id}`, { user })
      .then(async (res) => {
        console.log(res);
        if (res.status===201) {
          const signinResult = await signIn("credentials", {
            redirect: false,
            email: res.data.email,
          });

          if (!signinResult.error) {
            router.push(`/`);
          }
          setLoad(false);
          setMessage(false);
          signOut({ callbackUrl: "/" });
        } else {
          setLoad(false);
          setErrMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggle = () => setMessage(!message);
  useEffect(() => {
    // console.log(user);
  }, []);

  return (
    <div className="appointment-area-two ptb-100">
      <FormModal
        isOpen={message}
        toggle={toggle}
        submit={update}
        load={load}
        errMessage={errMessage}
      />
      <div className="container">
        <div className="row align-items-center appointment-wrap-two justify-content-center">
          <div>
            <div className="appointment-item appointment-item-two">
              <div className="appointment-shape">
              </div>

              <h2 style={{ textAlign: "center", marginBottom: "3rem" }}>
                Profile Update
              </h2>
              <div className="col-lg-6 p-0" style={{ position: "relative" }}>
                <img
                  alt="profilePicture"
                  src={
                    profile.picture !== ""
                      ? profile.picture
                      : "https://i.stack.imgur.com/l60Hf.png"
                  }
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="appointment-form mt-5">
                <form onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <i className="icofont-business-man-alt-1"></i>
                        <label>Name</label>
                        <input
                          value={user.firstName}
                          type="text"
                          name="firstName"
                          className="form-control"
                          placeholder="Enter Your Name"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <i className="icofont-business-man-alt-1"></i>
                        <label>Last Name</label>
                        <input
                          value={user.lastName}
                          name="lastName"
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                          placeholder="Enter Your Last Name"
                        />
                      </div>
                    </div>

                    {/* <div className="col-lg-6">
                      <div className="form-group">
                        <i className="icofont-ui-message"></i>
                        <label>Email</label>
                        <input
                          value={user.email}
                          name="email"
                          onChange={handleChange}
                          type="email"
                          className="form-control"
                          placeholder="Enter Your Email"
                        />
                      </div>
                    </div> */}

                    <div className="col-lg-6">
                      <div className="form-group">
                        <i className="icofont-ui-call"></i>
                        <label>Phone</label>
                        <input
                          value={user.telephone}
                          onChange={handleChange}
                          name="telephone"
                          type="text"
                          className="form-control"
                          placeholder="Enter Your Number"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <i className="fas fa-user-circle"></i>
                        <label>Profile Picture</label>
                        <input
                          value={user.picture}
                          onChange={handleChange}
                          name="picture"
                          type="text"
                          className="form-control"
                          placeholder="Link To Picture"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <i className="icofont-business-man"></i>
                        <label>Birth Date</label>
                        <input
                          value={user.birthDate}
                          type="date"
                          name="birthDate"
                          className="form-control"
                          placeholder="Birth Date"
                          min="1900-01-01"
                          // max={todayDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn appointment-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  const backend =
    process.env.NEXT_PUBLIC_REACT_APP_BACK_END || "http://localhost:5000"; //Getting backend address from .ENV

  let profileRes = await fetch(
    `${backend}/api/profile/${context.params.profile_id}`
  );
  let profileData = await profileRes.json();
  return {
    props: {
      profile: profileData,
      userId: context.params.profile_id,
      backend:backend,
    },
  };
}

export default UpdateProfile;
