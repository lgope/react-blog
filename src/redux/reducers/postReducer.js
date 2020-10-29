import * as actions from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  posts: '',
  post: '',
  tags:''
};

// disble eslint
export default function (state = initialState, action) {
  switch (action.type) {
    case actions.POSTS_LOADING:
      return {  
        ...state,
        isLoading: true,
      };
    case actions.GET_ALL_POSTS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };

    case actions.GET_POST_DETAILS:
      return {
        ...state,
        isLoading: false,
        post: action.payload,
      };

    case actions.GET_ALL_TAGS:
      return {
        isLoading: false,
        tags: action.payload,
      };
    
    case actions.GET_ALL_CATEGORIES:
      return {
        isLoading: false,
        categories: action.payload,
      };
    
    default:
      return state;
  }
}
