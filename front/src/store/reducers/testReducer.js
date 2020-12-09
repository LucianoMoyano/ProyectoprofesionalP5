import { POST_TEST, CONFIRM_POST, SET_TIMER, GET_TEST, FETCH_DATE } from "../constants";

const initialState = {
  allTests: [],
  test: {},
  testPosted: false,
  minutes: 2,
  seconds: 5,
  testDate: "", 
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_TEST:
      return { ...state, test: action.payload };
    case CONFIRM_POST:
      return { ...state, testPosted: action.payload };
    case SET_TIMER:
      return { ...state, minutes: 1, seconds: 30 };
    case GET_TEST:
      return { ...state, allTests: action.payload };
    case FETCH_DATE:
      return { ...state, testDate: action.payload };
    default:
      return state;
  }
}
