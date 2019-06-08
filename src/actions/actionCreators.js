/* eslint-disable import/prefer-default-export */
import { LOGIN, LOGOUT, SAVE_MARKERS } from "../constants";
import userService from "../utils/auth";

export const loginAction = ({ username, email }) => {
  userService.save({ loggedIn: true, username, email });
  return {
    type: LOGIN,
    username,
    email
  };
};

export const logoutAction = () => {
  userService.remove();
  return {
    type: LOGOUT,
    username: "",
    email: ""
  };
};

export const saveMarkersAction = markers => {
  return {
    type: SAVE_MARKERS,
    markers
  };
};
