import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: ${(props) => (props.variant === "text" ? 0 : "1px solid lightblue")};
  padding: 10px 20px;
  cursor: pointer;
  outline: 0;

  &:active {
    background-color: lightblue;
  }
`;

function Button({ onClick = () => {}, variant = "primary", children }) {
  return (
    <StyledButton variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default Button;
