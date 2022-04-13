import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import authReducer from "../redux/reducers/authReducer";
import messageReducer from "../redux/reducers/messageReducer";
import languageReducer from "../redux/reducers/languageReducer";
import userReducer from "../redux/reducers/userReducer";
import linkreducer from "../redux/reducers/linkToReducer";
import recordingPermissionsReducer from "../redux/reducers/recordingPermissionsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  language: languageReducer,
  user: userReducer,
  linkTo: linkreducer,
  recordingPermissions: recordingPermissionsReducer,
});

// const dispatch = useDispatch()
/** initial state */
let initialState = {};
if (typeof window !== "undefined") {
  const userData = sessionStorage.getItem("userData")
    ? JSON.parse(sessionStorage.getItem("userData"))
    : {};

  initialState = {
    auth: userData,
  };
}

//With dev tools only for dev
export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
