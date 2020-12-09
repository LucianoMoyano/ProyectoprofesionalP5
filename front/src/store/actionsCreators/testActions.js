import axios from "axios";
import { CONFIRM_POST, FETCH_QUESTIONS, POST_TEST, SET_TIMER, GET_TEST, FETCH_DATE } from "../constants";

const testQuestions = (data) => ({
  type: FETCH_QUESTIONS,
  payload: data,
});

const getTest = (data) => ({
  type: GET_TEST,
  payload: data,
});

const fetchDate = (data) => ({
  type: FETCH_DATE,
  payload: data,
});

const postTest = (data) => ({
  type: POST_TEST,
  payload: data,
});

export const confirmPost = (data) => ({
  type: CONFIRM_POST,
  payload: data,
});

const setTimer = () => ({
  type: SET_TIMER,
});

export const fetchSkillDate = (idUser, idSkill) => (dispatch) => {
  return axios
    .get(`/api/tests/${idUser}/${idSkill}`)
    .then(({ data }) => dispatch(fetchDate(data)));
};

export const fetchQuestions = (idSkill) => (dispatch) => {
  axios
    .get(`/api/questions/${idSkill}`)
    .then(({ data }) => dispatch(testQuestions(data)));
};

export const sendTest = (test, userAnswers, body) => (dispatch) => {
  console.log(body, 'BODY')
  //ACA ATAJAMOS EL ARRAY DE RPTAS Y LAS FILTRAMOS ANTES DE MANDARLAS AL BACK
  let finalAnswers = userAnswers.filter((ans) => ans === "true")
  let res = {...test, status : finalAnswers.length}
  console.log("USER", userAnswers)
  return axios
    .post(`/api/tests/`, res)
    .then(({ data }) => {
      return axios.post('/api/userAnswers/postUserAnswers', 
      {...body, testId: data[0].id, userId: data[0].userId})
      .then(() => {
      return dispatch(postTest(data))   
      })
     })
    .then(() => {
      setTimeout(() => dispatch(confirmPost(true)), 3000)
    });
};

export const resetTimer = () => (dispatch) => {
  dispatch(setTimer())
};

export const fetchTests = () => (dispatch) => {
  axios
    .get(`/api/tests/`)
    .then(({data}) => dispatch(getTest(data)))
}