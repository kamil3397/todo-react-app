import styled from "styled-components";

export const BasicLayout = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

  font-family: "Poppins", sans-serif;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  background-color: #f8f9fa;
`;

export const Header = styled.header`
  height: 70px;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  position: fixed;
  top: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  color: #ff6a95;

  @media (min-width: 768px) {
    height: 100px;
    font-size: 24px;
  }

  @media (max-width: 480px) {
    height: 50px;
    font-size: 18px;
  }
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  padding: 0;
  text-align: center;
  color: #ff6a95;

  @media (min-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

