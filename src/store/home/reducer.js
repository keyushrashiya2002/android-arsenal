import { API_GET_DATA, API_SUCCESS, API_ERROR } from "./actionType";

const INIT_STATE = {
  data: {},
  loading: false,
  homeError: null,
  error: false,
};

const Home = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_GET_DATA:
      state = {
        ...state,
        loading: true,
        homeError: null,
        error: false,
      };
      break;
    case API_SUCCESS:
      state = {
        ...state,
        loading: false,
        data: action.payload.data,
        homeError: null,
        error: false,
      };
      break;
    case API_ERROR:
      state = {
        ...state,
        loading: false,
        homeError: action.payload.error,
        error: true,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Home;
