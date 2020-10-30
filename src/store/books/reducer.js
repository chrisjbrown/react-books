import { v4 } from "uuid";
import { ADD_BOOK, REMOVE_BOOK } from "./actions";

function booksStore(state = [], action) {
  switch (action.type) {
    case ADD_BOOK:
      return [
        ...state,
        {
          id: v4(),
          name: action.book.name,
          author: action.book.author,
          customFields: action.book.customFields.filter(
            (field) => field.key && field.value
          ),
        },
      ];
    case REMOVE_BOOK:
      return state.filter((book) => book.id !== action.id);
    default:
      return state;
  }
}

export default booksStore;
