import styled from "styled-components";

const StyledBook = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border: 1px solid pink;
  text-overflow: ellipsis;
  overflow: hidden;

  .remove {
    position: absolute;
    top: 0;
    right: 0;
    color: black;
    font-size: 16px;
    padding: 10px;
    border: 1px solid black;

    &:hover,
    &:active,
    &:focus {
      background-color: black;
      color: white;
    }
  }

  .text {
    margin-top: 20px;
    color: black;
    text-decoration: none;

    > div:last-child {
      margin-top: 10px;
    }
  }
`;

function Book({ id, name = "", author = "", remove = () => {} }) {
  function onRemove(e) {
    e.preventDefault();
    remove(id);
  }

  return (
    <StyledBook>
      <span className="remove" onClick={(e) => onRemove(e)}>
        X
      </span>
      <div className="text">
        <div>Name: {name}</div>
        {author && <div>Author: {author}</div>}
      </div>
    </StyledBook>
  );
}

export default Book;
