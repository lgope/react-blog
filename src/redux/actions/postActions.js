import axios from 'axios';
import * as actions from './actionTypes';
import { tokenConfig } from '../actions/authActions';

// get / read
// fetch Posts
export const fetchPosts = () => (dispatch, getState) => {
  axios
    .get('https://blog.techrapples.com/api/posts', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: actions.GET_ALL_POSTS,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

// fetch Post Deatails
export const getPostDetails = (id) => (dispatch, getState) => {
  axios
    .get(`https://blog.techrapples.com/api/posts/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: actions.GET_POST_DETAILS,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

// fetch Tags
export const fetchTags = () => (dispatch, getState) => {
  axios
    .get('https://blog.techrapples.com/api/tags', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: actions.GET_ALL_TAGS,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};


// fetch Categories
export const fetchCategories = () => (dispatch, getState) => {
  axios
    .get('https://blog.techrapples.com/api/categories', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: actions.GET_ALL_CATEGORIES,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};
