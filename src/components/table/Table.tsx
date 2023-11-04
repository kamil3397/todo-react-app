import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  border: 1px solid red;
`;
export const TableRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border: 1px solid yellow;
`;
export const TableCell = styled.div`
  display: flex;
  justify-content: center;
  width: 25%;
  height: 100%;
  border: 1px solid green;
`;
export const Button = styled.button`
  background-color: blue;
  color: black;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  flex-grow: 1;
  :hover {
    background-color: lightblue;
  }
`;

