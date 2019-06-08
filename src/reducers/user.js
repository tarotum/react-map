import { LOGIN, LOGOUT } from "../constants";
import userService from "../utils/auth";

const defaultState = {
  loggedIn: false,
  username: "",
  email: ""
};
let initialState = defaultState;

if (userService.get() !== undefined) {
  initialState = userService.get();
}

const user = (state = initialState, { type, username, email }) => {
  switch (type) {
    case LOGIN:
      return {
        loggedIn: true,
        username,
        email
      };
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
};

export default user;
