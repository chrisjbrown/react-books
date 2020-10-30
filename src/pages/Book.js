import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import styled from "styled-components";

import { selectBook } from "../store/books/selectors";
import Header from "../components/Header";

const StyledError = styled.div`
  text-align: center;
  color: red;
`;

const StyledDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 500px;
  > div {
    border: 1px solid black;
    padding: 10px;
    text-align: center;
  }
`;

function Book({ selectBook }) {
  const { id } = useParams();

  const book = selectBook(id);

  function renderCustomFields() {
    return book.customFields.map((field, index) => (
      <React.Fragment key={index}>
        <div>{field.key}</div>
        <div>{field.value}</div>
      </React.Fragment>
    ));
  }

  function renderBook() {
    if (!book) {
      return <StyledError>Book not found :(</StyledError>;
    }

    return (
      <StyledDetails>
        <div>Name </div>
        <div>{book.name}</div>
        {book.author && (
          <React.Fragment>
            <div>Author</div>
            <div>{book.author}</div>
          </React.Fragment>
        )}
        {renderCustomFields()}
      </StyledDetails>
    );
  }

  return (
    <div>
      <Header>Book</Header>
      <Link to="/">
        <FaHome size="2em" />
      </Link>
      <h2>Book details</h2>
      {renderBook()}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    selectBook: (id) => selectBook(state, id),
  };
}

export default connect(mapStateToProps)(Book);
