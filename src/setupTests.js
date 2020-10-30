import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "jest-styled-components";

export function renderWithRouter(
  ui,
  { route = "/", initialState = [], ...renderOptions } = {}
) {
  window.history.pushState({}, "Test page", route);
  const mockStore = configureStore([]);
  const store = mockStore(initialState);
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }), store };
}
