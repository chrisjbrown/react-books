import reducer from "./reducer";
import * as actions from "./actions";

describe("book reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it("should handle ADD_BOOK", () => {
    const book1 = {
      name: "huck finn",
      author: "mark twain",
      customFields: [],
    };
    const book2 = {
      name: "my book",
      author: "me",
      customFields: [],
    };

    expect(
      reducer([], {
        type: actions.ADD_BOOK,
        book: book1,
      })
    ).toEqual(expect.objectContaining([book1]));

    expect(
      reducer([book1], {
        type: actions.ADD_BOOK,
        book: book2,
      })
    ).toEqual(expect.objectContaining([book1, book2]));
  });

  it("should handle REMOVE_BOOK", () => {
    const book1 = {
      id: 1,
      name: "huck finn",
      author: "mark twain",
      customFields: [],
    };
    const book2 = {
      id: 2,
      name: "my book",
      author: "me",
      customFields: [],
    };

    expect(
      reducer([book1, book2], {
        type: actions.REMOVE_BOOK,
        id: book1.id,
      })
    ).toEqual(expect.not.objectContaining([book1]));
  });
});
