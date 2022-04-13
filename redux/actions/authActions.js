//Axios
import axios from "axios";
//Redux
import {
  LOGIN_SUCCESS,
  //ADD_ENV,
  CREATE_MESSAGE,
  UPDATE_USER_PROFILE,
} from "../types";

// export const createEnv = (myEnv) => async (dispatch) => {
//   dispatch({ type: ADD_ENV, payload: {...myEnv} });
// };

export const register =
  (firstName, lastName, email, password, birthDate, backend) =>
  async (dispatch) => {
    try {
      // const response = await fetch('http://localhost:5000/api/register',
      const response = await fetch(
        `${backend}/api/register`,

        {
          method: "POST",
          body: JSON.stringify({
            firstName,
            lastName,
            password,
            email,
            birthDate,
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
  };

export const login = (email, password, backEndEnv) => async (dispatch) => {
  //This function gets the email and password from the user, sends to the DB and getting response.
  console.log("signing in");
  try {
    // const response = await fetch('http://localhost:5000/api/login', {
    const response = await fetch(`${backEndEnv}/api/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resultData = await response.json();

    if (response.status === 200 || response.status === 201) {
      const userPayload = {
        userId: resultData.userId,
        token: resultData.token,
        firstName: resultData.firstName,
        email: resultData.email,
        isMasterAdmin: resultData.masterAdmin,
        birthDate: resultData.birthDate,
        surveysTaken: resultData.surveysTaken,
        lastName: resultData.lastName,
      };

      dispatch({ type: LOGIN_SUCCESS, payload: { ...userPayload } });

      // saving user id and token in local storage
      sessionStorage.setItem("userData", JSON.stringify({ ...userPayload }));
      return true;
      // localStorage.setItem("email", userData.email);
    } else {
      return resultData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginWithGoogle = (res, backend) => async (dispatch) => {
  // console.log(res)
  let result;
  let userPayload;
  await axios
    .post(`${backend}/api/googlelogin`, { tokenId: res.tokenId })
    .then((response) => {
      result = response.status;

      userPayload = {
        userId: response.data.user._id,
        token: response.data.token,
        firstName: response.data.user.firstName,
        email: response.data.user.email,
      };

      // dispatch({ type: LOGIN_SUCCESS, payload: { ...userPayload } });

      // saving user id and token in local storage
      sessionStorage.setItem("userData", JSON.stringify({ ...userPayload }));

      // return true
      // localStorage.setItem("email", userData.email);
    })
    .catch((err) => console.log(err));
  if (result === 200 || result === 201) {
    return userPayload;
  } else {
    return false;
  }
};

export const loginWithFacebook = (res, backend) => async (dispatch) => {
  console.log(res);
  let result;
  await axios
    .post(`${backend}/api/facebooklogin`, {
      accessToken: res.accessToken,
      userId: res.userID,
      email: res.email,
    })
    .then((response) => {
      console.log("facebook login success");
      result = response.status;
      // const userPayload = {
      //   userId: response.data.user._id,
      //   token: response.data.token,
      //   firstName: response.data.user.firstName,
      //   email: response.data.user.email,
      // };
      // console.log(userPayload)
      // dispatch({ type: LOGIN_SUCCESS, payload: { ...userPayload } });

      // // saving user id and token in local storage
      // sessionStorage.setItem("userData", JSON.stringify({ ...userPayload }));

      // return true
      // localStorage.setItem("email", userData.email);
    })
    .catch((err) => console.log(err));
  console.log(result);
  if (result === 200 || result === 201) {
    return true;
  } else {
    return false;
  }
};

// export const updateUserProfile = (user, backEnd, password) => async (dispatch) => {
//   await axios.post(`${backEnd}/api/updateUserProfile`, { user, password })
//     .then(res => {
//       if (res) {
//         return (res.data)
//       }
//     }).catch(err => {
//       console.log(err)
//     });
// }

// export const getProfile = (userId, token) => async (dispatch) => {
//   try {
//     // const response = await fetch(`http://localhost:5000/api/profile/${userId}`, {
//     const response = await fetch(`${backend}/api/profile/${userId}`, {
//       method: "GET",
//       headers: {
//         authorization: "Bearer " + token,
//       },
//     });

//     const profileResponse = await response.json();

//     dispatch({ type: GET_PROFILE, payload: profileResponse });
//     // dispatch({ type: SUBSCRIBE_TO_UPDATES, payload: profileResponse.profile });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updateProfile = (updatedProfile, token) => async (dispatch) => {
//   let id = updatedProfile.userId;
//   let profile = { ...updatedProfile };
//   try {
//     // const response = await fetch(`http://localhost:5000/api/updatedProfile/${id}`, {
//     const response = await fetch(`${backend}/api/updatedProfile/${id}`, {
//       method: "POST",
//       body: JSON.stringify(profile),
//       headers: {
//         authorization: "Bearer " + token,
//         "Content-Type": "application/json",
//       },
//     });

//     const updateProfileResponse = await response.json();

//     if (response.status === 200 || response.status === 201) {
//       return updateProfileResponse;
//     } else {
//       let messageContent = {
//         errorMessage: updateProfileResponse.message,
//         title: "Failed to update",
//         buttonText: "Try again",
//       };
//       dispatch({ type: CREATE_MESSAGE, payload: messageContent });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getAllUsers = (id, token) => async (dispatch) => {
//   try {
//     // const response = await fetch(`http://localhost:5000/api/profiles/${id}`, {
//     const response = await fetch(`${backend}/api/profiles/${id}`, {
//       method: "GET",
//       headers: {
//         authorization: "Bearer " + token,
//       },
//     });

//     const profileResponse = await response.json();

//     dispatch({ type: GET_PROFILES, payload: profileResponse.profiles });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const logout = (email, backend) => async (dispatch) => {
  try {
    await fetch(`${backend}/api/logout`, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }

  // sessionStorage.removeItem("userData");
  // dispatch({ type: LOGOUT, payload: {} });
};
