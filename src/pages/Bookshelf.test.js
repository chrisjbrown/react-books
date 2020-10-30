import React from "react";
import { renderWithRouter } from "../setupTests";
import { fireEvent } from "@testing-library/react";

import BookShelf from "./BookShelf";

const stateWithBooks = [
  { id: 1, name: "huck finn", author: "mark twain" },
  { id: 2, name: "Lion, witch, and wardrobe", author: "CS Lewis" },
];

describe("BookShelf page", () => {
  it("should have default view", () => {
    const { container } = renderWithRouter(<BookShelf />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should have default view with books", () => {
    const { container } = renderWithRouter(<BookShelf />, {
      initialState: stateWithBooks,
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should sort books desc", () => {
    const { container, getByText } = renderWithRouter(<BookShelf />, {
      initialState: stateWithBooks,
    });

    fireEvent.click(getByText("Sort"));

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render books as list", () => {
    const { container, getByText } = renderWithRouter(<BookShelf />, {
      initialState: stateWithBooks,
    });

    fireEvent.click(getByText("List/"));

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should call add book", () => {
    const { getByLabelText, getByTitle, getByText, store } = renderWithRouter(
      <BookShelf />,
      {
        initialState: stateWithBooks,
      }
    );

    fireEvent.click(getByTitle("add-book"));

    fireEvent.change(getByLabelText("Name:"), {
      target: { value: "my book" },
    });
    fireEvent.change(getByLabelText("Author:"), {
      target: { value: "me" },
    });
    fireEvent.click(getByText("Done"));

    const actions = store.getActions();
    const expectedPayload = {
      type: "ADD_BOOK",
      book: {
        name: "my book",
        author: "me",
        customFields: [],
      },
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it("should call remove book", () => {
    const { getAllByText, store } = renderWithRouter(<BookShelf />, {
      initialState: stateWithBooks,
    });

    fireEvent.click(getAllByText("X")[0]);

    const actions = store.getActions();
    const expectedPayload = { type: "REMOVE_BOOK", id: 1 };
    expect(actions).toEqual([expectedPayload]);
  });
});
