export const ADD_BOOK = "ADD_BOOK";
export const REMOVE_BOOK = "REMOVE_BOOK";

export function addBook(book) {
  return { type: ADD_BOOK, book };
}

export function removeBook(id) {
  return { type: REMOVE_BOOK, id };
}
