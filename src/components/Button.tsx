import React from 'react';
import styled from 'styled-components';

const ButtonBox = styled.button`
  width: 80px;
  height: 40px;
  background: var(--color-3);
  color: #000;
  border-radius: 2px;
  margin: 0 10px;
  &:active {
    opacity: 0.7;
  }
  &:hover {
    opacity: 0.9;
  }
`;
interface ButtonProps {
  name?: string;
  onClick?: () => void;
}
const CreateButton = (props: ButtonProps) => {
  return <ButtonBox onClick={props.onClick}>{props.name || '新建'}</ButtonBox>;
};
export default CreateButton;
