import React from "react";
import { renderWithRouter } from "./setupTests";

import App from "./App";

it("should have default route", () => {
  const { container } = renderWithRouter(<App />);

  expect(container.firstChild).toMatchSnapshot();
});

it("should have book route", () => {
  const { container } = renderWithRouter(<App />, {
    route: "/book/123",
  });
  expect(container.firstChild).toMatchSnapshot();
});
