import React, { useReducer, useState } from "react";
import { connect } from "react-redux";

import Modal from "../components/Modal";
import Button from "../components/Button";
import { addBook } from "../store/books/actions";

import {
  StyledBody,
  StyledTitle,
  StyledError,
  StyledForm,
  FullRowCell,
} from "./AddBookModal.style";

const initialState = {
  name: "",
  author: "",
  customFields: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.value,
      };
    case "UPDATE_AUTHOR":
      return {
        ...state,
        author: action.value,
      };
    case "ADD_CUSTOM_FIELD":
      return {
        ...state,
        customFields: [...state.customFields, { key: "", value: "" }],
      };
    case "UPDATE_CUSTOM_FIELD":
      return {
        ...state,
        customFields: state.customFields.map((field, index) => {
          if (index === action.field.index) {
            return {
              ...field,
              [action.field.prop]: action.field.value,
            };
          }
          return field;
        }),
      };
    default:
      return state;
  }
};

function AddBookModal({ dispatchAddBook, close = () => {} }) {
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  function addBook() {
    if (!state.name) {
      setError("A book name is required");
      return;
    }

    dispatchAddBook(state);
    close();
  }

  function updateValue(type, value) {
    if (error && type === "UPDATE_NAME" && value) {
      setError(null);
    }
    dispatch({ type, value });
  }

  function addCustomField(e) {
    e.preventDefault();

    dispatch({ type: "ADD_CUSTOM_FIELD" });
  }

  function updateCustomField(index, prop, value) {
    dispatch({ type: "UPDATE_CUSTOM_FIELD", field: { index, prop, value } });
  }

  function renderCustomFields() {
    return state.customFields.map((field, index) => (
      <React.Fragment key={index}>
        <input
          type="text"
          value={field.key}
          placeholder="Custom field key"
          onChange={(e) => updateCustomField(index, "key", e.target.value)}
        />
        <input
          type="text"
          value={field.value}
          placeholder="Custom field value"
          onChange={(e) => updateCustomField(index, "value", e.target.value)}
        />
      </React.Fragment>
    ));
  }

  return (
    <Modal onConfirm={addBook} onCancel={close}>
      <StyledBody>
        <StyledTitle>Add a book</StyledTitle>
        <StyledError>{error}</StyledError>
        <StyledForm>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={state.name}
            onChange={(e) => updateValue("UPDATE_NAME", e.target.value)}
          />
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={state.author}
            onChange={(e) => updateValue("UPDATE_AUTHOR", e.target.value)}
          />
          {renderCustomFields()}
          <FullRowCell>
            <Button onClick={(e) => addCustomField(e)}>+ Add new field</Button>
          </FullRowCell>
        </StyledForm>
      </StyledBody>
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchAddBook: (id) => dispatch(addBook(id)),
});

export default connect(() => ({}), mapDispatchToProps)(AddBookModal);
