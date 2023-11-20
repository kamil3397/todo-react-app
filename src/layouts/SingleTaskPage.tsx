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

export const CompleteButton = styled(Button)`
  background-color: #5cb85c;
  color: #fff;

  &:hover {
    background-color: #4cae4c;
  }
`;

export const InProgressButton = styled(Button)`
  background-color: #0398fc;
  color: #fff;

  &:hover {
    background-color: #1a8cd9;
  }
`;
export const DeleteButton = styled(Button)`
  background-color: #ff5c5c;
  color: #fff;

  &:hover {
    background-color: #e74c3c;
  }
`;


export const EditButton = styled(Button)`
  background-color: #3498db;
  color: #fff;

  &:hover {
    background-color: #2980b9;
  }
`;

export const CloseButton = styled(Button)`
  background-color: #ff5c5c;
  color: #fff;

  &:hover {
    background-color: #e74c3c;
  }
`;

export const EditWrapper = styled.div`
border: 1px solid #ccc;
  padding: 16px;
  margin: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(26, 13, 13, 0.1);

display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  input,
  textarea {
    padding: 5px;
    font-size: 16px;
    resize: none;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }
  }
`;