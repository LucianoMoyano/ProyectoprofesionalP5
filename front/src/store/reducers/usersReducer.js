import { SET_USER, SET_USERS, SET_SKILLS } from "../constants";

const initialState = {
  user: {},
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
