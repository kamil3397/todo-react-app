import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  background-color: #fff;
  color: #000;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0px 10px 35px -1px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 10px 35px -1px rgba(66, 68, 90, 1);
  box-shadow: 0px 10px 35px -1px rgba(66, 68, 90, 1);
  padding: 0px 5px;
`;

export const TableRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #d1d1d1;
  padding: 10px 0;

  @media (min-width: 768px) {
    height: 60px; 
    font-size: 18px; 
  }

    @media(min-width: 620px) {
    height: 40%;
  }

  @media (min-width: 480px) {
    height: 40px;
  }
`;

export const TableCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
  text-align: center;

  @media (min-width: 768px) {
    width: 25%;
  }
  @media(min-width: 631px) {
    width: 40%;
  }
  @media (max-width: 480px) {
    width: 40%;
  }
`;

export const Button = styled.button`
  background-color: #202142;
  border-radius: 8px;
  color: #ff6a95;
  border: none;
  width: 80%;
  height: 40px;
  cursor: pointer;
  transition: ease-in-out .2s;

  &:hover {
    opacity: 0.9;
  }

  @media (min-width: 768px) {
    width: 80%;
    height: 40px; 
  }
  @media (max-width: 480px) {
    width: 95%;
    height: 45px; 
  }
`;