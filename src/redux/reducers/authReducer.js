import * as actions from '../actions/actionTypes';

const initialState = {
  api_token: localStorage.getItem('api_token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  logedUser: null,
  resetMessage: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actions.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case actions.LOGIN_SUCCESS:
      localStorage.setItem('api_token', action.payload);
      return {
        ...state,
        ...action.payload,
        api_token: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case actions.AUTH_ERROR:
    case actions.LOGIN_FAIL:
    case actions.LOGOUT_SUCCESS:
      localStorage.removeItem('api_token');
      return {
        ...state,
        api_token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case actions.RESET_PASSWORD:
      return {
        ...state,
        resetMessage: action.payload,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
