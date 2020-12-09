import axios from "axios";
import { SET_SKILLS, FETCH_SKILL } from "../constants";

export const setSkills = (data) => ({ type: SET_SKILLS, payload: data });
export const fetchSkill = (data) => ({ type: FETCH_SKILL, payload: data });

export const fetchSkills = (user) => (dispatch) =>
  axios
    .get(`/api/users/${user.id}/skill`)
    .then(({ data }) => dispatch(setSkills(data)));

export const getSkill = (id) => (dispatch) =>
    axios
      .get(`/api/skills/${id}`)
      .then(({ data }) => dispatch(fetchSkill(data)));
  