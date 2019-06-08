import { SAVE_MARKERS } from "../constants";

const markers = (state = [], action) => {
  switch (action.type) {
    case SAVE_MARKERS:
      return action.markers;
    default:
      return state;
  }
};

export default markers;
