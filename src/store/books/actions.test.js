import * as actions from "./actions";

describe("actions", () => {
  it("should add book", () => {
    const book = {
      name: "my book",
      author: "me",
    };
    const expectedAction = {
      type: actions.ADD_BOOK,
      book,
    };
    expect(actions.addBook(book)).toEqual(expectedAction);
  });
  it("should remove book", () => {
    const id = 1;
    const expectedAction = {
      type: actions.REMOVE_BOOK,
      id,
    };
    expect(actions.removeBook(id)).toEqual(expectedAction);
  });
});
