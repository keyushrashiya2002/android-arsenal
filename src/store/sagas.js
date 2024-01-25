import { all, fork } from "redux-saga/effects";

// Home
import homeSaga from "./home/saga";
//layout
import LayoutSaga from "./layouts/saga";
//Auth
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";

//API Key
import APIKeysaga from "./apikey/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(homeSaga),
    fork(LayoutSaga),
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(APIKeysaga),
  ]);
}
