import { GET_ERRORS, CLEAR_ERRORS } from './actionTypes';
// import { IMsg } from '../../types/interfaces';

// RETURN ERRORS
export const returnErrors = (message, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { message, status, id },
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
