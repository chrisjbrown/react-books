export function selectBook(state, id) {
  return state.find((book) => book.id === id);
}
