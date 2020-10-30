import { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaBook } from "react-icons/fa";
import { connect } from "react-redux";

import styled from "styled-components";
import Book from "../components/Book";
import Button from "../components/Button";
import Header from "../components/Header";
import AddBookModal from "../components/AddBookModal";
import { removeBook } from "../store/books/actions";

const BookList = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.gridView ? "repeat(auto-fit, 160px);" : "1fr"}
  column-gap: 20px;
  row-gap: 20px;
`;

const GridControls = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid black;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

function Bookshelf({ books, dispatchRemoveBook }) {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const sort = query.get("sort") || "asc";
  const view = query.get("view") || "grid";
  const isSortAsc = sort === "asc";
  const isGridView = view === "grid";

  const [bookModalOpen, setBookModalOpen] = useState(false);

  function openBookModal() {
    setBookModalOpen(true);
  }

  function closeBookModal() {
    setBookModalOpen(false);
  }

  function toggleSort() {
    query.set("sort", isSortAsc ? "desc" : "asc");
    history.push({ pathname: "/", search: `?${query.toString()}` });
  }

  function toggleGrid() {
    query.set("view", isGridView ? "list" : "grid");
    history.push({ pathname: "/", search: `?${query.toString()}` });
  }

  function removeBook(id) {
    dispatchRemoveBook(id);
  }

  function renderBooks() {
    const sortedBooks = books.sort((a, b) => {
      if (isSortAsc) {
        return a.name.toLowerCase() > b.name.toLowerCase();
      } else {
        return a.name.toLowerCase() < b.name.toLowerCase();
      }
    });

    return sortedBooks.map((book) => (
      <StyledLink key={book.id} to={`/book/${book.id}`}>
        <Book
          id={book.id}
          name={book.name}
          author={book.author}
          remove={removeBook}
        />
      </StyledLink>
    ));
  }

  return (
    <div>
      {bookModalOpen && <AddBookModal close={closeBookModal} />}
      <Header>Bookshelf</Header>
      <GridControls>
        <Button variant="text" onClick={toggleSort}>
          {isSortAsc ? <FaChevronDown /> : <FaChevronUp />}
          Sort
        </Button>
        <Button onClick={openBookModal}>
          + <FaBook title="add-book" />
        </Button>
        <Button variant="text" onClick={toggleGrid}>
          {isGridView ? (
            <span>
              List/<strong>Grid</strong>
            </span>
          ) : (
            <span>
              <strong>List</strong>/Grid
            </span>
          )}
        </Button>
      </GridControls>
      <BookList gridView={isGridView}>{renderBooks()}</BookList>
    </div>
  );
}

const mapStateToProps = (state) => ({
  books: state,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRemoveBook: (id) => dispatch(removeBook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookshelf);
