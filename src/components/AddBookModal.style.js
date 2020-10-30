import styled from "styled-components";

export const StyledBody = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const StyledTitle = styled.h2`
  text-align: center;
`;

export const StyledError = styled.h3`
  color: red;
  text-align: center;
`;

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  column-gap: 20px;
  align-items: center;
  flex: 1;
`;

export const FullRowCell = styled.div`
  grid-column: 1/-1;
  display: flex;
  justify-content: center;
`;
