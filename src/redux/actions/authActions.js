import axios from 'axios';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  RESET_PASSWORD,
} from './actionTypes';
import { returnErrors } from './errorActions';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING }); // dispatch used for asyc req

  axios
    .get('https://blog.techrapples.com/api/users', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data.data,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Login User
export const login = body => dispatch => {
  dispatch({ type: USER_LOADING }); // dispatch used for asyc req
  axios
    .post('https://blog.techrapples.com/api/auth/token', body)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data.api_token,
      });
    })
    .catch(err => {;
      dispatch(
        returnErrors(
          err.response.data.message,
          err.response.status,
          'LOGIN_FAIL'
        )
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Login User
export const resetPassword = body => dispatch => {
  dispatch({ type: USER_LOADING }); // dispatch used for asyc req
  axios
    .post('https://blog.techrapples.com/api/auth/reset-password', body)
    .then(res => {
      dispatch({
        type: RESET_PASSWORD,
        payload: res.data.data.message,
      });
    })
    .catch(err => {
      dispatch({
        type: RESET_PASSWORD,
        payload: err.response.data.message,
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const api_token = getState().auth.api_token;
  // Headers
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  // If token, add to headers
  if (api_token) {
    config.headers['Authorization'] = `Bearer ${api_token}`;
  }
  return config;
};
