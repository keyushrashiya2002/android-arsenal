import { API_GET_DATA, API_SUCCESS, API_ERROR } from "./actionType";

export const getData = (actionType, data) => ({
  type: API_GET_DATA,
  payload: { actionType, data },
});
export const dataResponseError = (actionType, error) => ({
  type: API_ERROR,
  payload: { actionType, error },
});
export const dataResponseSuccess = (actionType, data) => ({
  type: API_SUCCESS,
  payload: { actionType, data },
});
