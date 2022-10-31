import { ActionConstants } from "./actionConstants";

interface LoadingInterface {
  type: ActionConstants.LOADING;
  payload: boolean;
}
interface UserDataInterface {
  type: ActionConstants.USERDATA;
  payload: UserData;
}
interface LogOutInterface {
  type: ActionConstants.LOGOUT;
}
interface FeedPostInterface {
  type: ActionConstants.FEEDPOST;
  payload: { posts: Post[] };
}

export type Action =
  | LoadingInterface
  | UserDataInterface
  | LogOutInterface
  | FeedPostInterface;

const loadingAction = (payload: boolean) => {
  return {
    type: ActionConstants.LOADING,
    payload,
  };
};
const userDataAction = (payload: UserData) => {
  return {
    type: ActionConstants.USERDATA,
    payload,
  };
};
//need to change this one
const logoutAction = () => {
  return {
    type: ActionConstants.LOGOUT,
  };
};
const feedPostAction = (payload: { posts: Post[] }) => {
  return {
    type: ActionConstants.FEEDPOST,
    payload,
  };
};

export { loadingAction, userDataAction, logoutAction, feedPostAction };
