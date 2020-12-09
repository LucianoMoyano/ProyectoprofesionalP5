import { SET_SKILLS, FETCH_SKILL } from "../constants";

const initialState = {
  userSkills: [],
  selectedSkill: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SKILLS:
      return { ...state, userSkills: action.payload };
    case FETCH_SKILL:
      return {...state, selectedSkill: action.payload}
    default:
      return state;
  }
};
