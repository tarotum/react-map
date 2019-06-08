export default {
  get: () => {
    try {
      const serializedState = localStorage.getItem("user");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      return undefined;
    }
  },
  save: state => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("user", serializedState);
    } catch (error) {
      // Ignore
    }
  },
  remove: () => {
    try {
      localStorage.removeItem("user");
    } catch (error) {
      // Ignore
    }
  }
};
