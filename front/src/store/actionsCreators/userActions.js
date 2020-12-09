import axios from "axios";
import {  SET_USER, SET_USERS } from "../constants";

export const setUser = (user) => ({ type: SET_USER, payload: user });

export const setUsers = (data) => ({ type: SET_USERS, payload: data });

export const fetchUsers = () => (dispatch) =>
  axios.get("/api/users").then(({ data }) => dispatch(setUsers(data)));

export const fetchUser = (user) => (dispatch) =>
  axios
    .get(`/api/users/${user.id}`)
    .then(({ data }) => dispatch(setUser(data)));


  
