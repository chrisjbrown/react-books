import { createStore } from "redux";

import { loadStore, saveStore } from "./persistence";
import BookStore from "./books/reducer";

const persistedStore = loadStore();
const store = createStore(
  BookStore,
  persistedStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveStore({
    state: store.getState(),
  });
});

export default store;
