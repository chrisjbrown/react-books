import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { Provider } from "react-redux";

import Bookshelf from "./pages/BookShelf";
import Book from "./pages/Book";
import store from "./store";

const Layout = styled.div`
  max-width: 880px;
  margin: 0 auto;
`;

function App() {
  return (
    <Router>
      <Layout>
        <Provider store={store}>
          <Switch>
            <Route exact path="/">
              <Bookshelf />
            </Route>
            <Route path="/book/:id">
              <Book />
            </Route>
          </Switch>
        </Provider>
      </Layout>
    </Router>
  );
}

export default App;
