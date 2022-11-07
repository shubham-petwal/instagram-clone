import { Action } from "../actions/index";
import { ActionConstants } from "../actions/actionConstants";

const initialState: ReduxState = {
  isLoading: false,
  feedPosts: [],
  userData: {
    uid: "",
    userName: "",
    postCount: 0,
    fullName: "",
    biodata: "",
    profileImage : ""
  },
};

const userReducer = (state: ReduxState = initialState, action: Action) => {
  switch (action.type) {
    case ActionConstants.LOADING:
      return { ...state, isLoading: action.payload };

    case ActionConstants.USERDATA:
      return { ...state, userData: action.payload };

    case ActionConstants.LOGOUT:
      return { ...initialState };

    case ActionConstants.FEEDPOST:
      return {
        ...state,
        feedPosts: [...state.feedPosts, ...action.payload.posts],
      };

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
