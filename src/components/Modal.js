import ReactDOM from "react-dom";
import styled from "styled-components";

import Button from "./Button";

const StyledModal = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);

  > div {
    display: flex;
    flex-direction: column;
    width: 500px;
    min-height: 300px;
    margin: 50px auto;
    background-color: white;
    border-radius: 4px;
    border: 1px solid grey;
    padding: 20px;

    .content {
      display: flex;
      flex-grow: 1;
    }

    .footer {
      display: flex;
      justify-content: flex-end;

      > button:last-child {
        margin-left: 10px;
      }
    }
  }
`;

function Modal({
  parent = document.body,
  onConfirm = () => {},
  onCancel = () => {},
  children,
}) {
  return ReactDOM.createPortal(
    <StyledModal>
      <div>
        <div className="content">{children}</div>
        <div className="footer">
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm}>Done</Button>
        </div>
      </div>
    </StyledModal>,
    parent
  );
}

export default Modal;
