export const loadStore = () => {
  try {
    const serializedState = localStorage.getItem("store");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState).state;
  } catch (error) {
    console.error("error reading from localstorage", error);
  }
};

export const saveStore = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("store", serializedState);
  } catch (error) {
    console.error("error saving to localstorage", error);
  }
};
