import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 100px;
  height: 60px;
  border-radius: 10px;
  font-size: 24px;
  background: var(--color-3);
  color: var(--color-2);
  text-shadow: 0 0 10px var(--color-2);
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 10px var(--color-3);
  }
  &:active {
    opacity: 0.7;
  }
`;
interface ButtonProps {
  text: string;
  onClick?: () => void;
}
const SaveButton = (props: ButtonProps) => {
  return <Button onClick={props.onClick}>{props.text}</Button>;
};
export default SaveButton;
