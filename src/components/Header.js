import styled from "styled-components";

const StyledHeader = styled.h1`
  text-align: center;
`;

function Header({ children }) {
  return <StyledHeader>{children}</StyledHeader>;
}

export default Header;
