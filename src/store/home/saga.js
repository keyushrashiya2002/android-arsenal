import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Invoice Redux States
import { API_GET_DATA } from "./actionType";

import { dataResponseSuccess, dataResponseError } from "./action";

//Include Both Helper File with needed methods
import { getHomePageData as getHomeApi } from "../../helpers/backend_helper";

function* getData({ payload: data }) {
  try {
    const response = yield call(getHomeApi, data.actionType);
    yield put(dataResponseSuccess(API_GET_DATA, response.data));
  } catch (error) {
    yield put(dataResponseError(API_GET_DATA, error.response));
  }
}

export function* watchGetInvoices() {
  yield takeEvery(API_GET_DATA, getData);
}

function* invoiceSaga() {
  yield all([fork(watchGetInvoices)]);
}

export default invoiceSaga;
