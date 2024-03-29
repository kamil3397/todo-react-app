import styled from "styled-components";

export const TaskWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(26, 13, 13, 0.1);
`;

export const TaskTitle = styled.h3`
  font-size: 1.5rem; //16px x 1.5 = 24px
  margin-top: 10px;
  margin-bottom: 10px;
  color: #000;
`;

export const TaskInfo = styled.p`
  font-size: 1rem;
  color: #000;
  margin: 16px 20px;
`;
export const Button = styled.button`
  padding: 8px 16px;
  margin-right: 8px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ddd;
  }
`;