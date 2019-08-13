import React from 'react';
import styled from 'styled-components';

const InputBox = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
`
const Label = styled.label`
  position: absolute;
  left: 50%;
  bottom: 50%;
  color: var(--color-2);
  font-size: 14px;
  transform: translate3d(-50%, 50%, 0);
  transition: all 1s;
  cursor: pointer;
`
const Line = styled.div`
  width: 100%;
  height: 1px;
  background: var(--color-3);
  border-radius: 1px;
  position: absolute;
  bottom: 0;
  left: 0;
  transform-origin: 50%;
  transform: scale(0);
  transition: all 0.8s;
`
const Input = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  font-size: 16px;
  position: relative;
  background: transparent;
  color: var(--color-2);
  text-align: center;
  :focus {
    & + label {
      bottom: 100%;
      left: 0;
      transform: translate3d(0, 0, 0);
    }
    & ~ div {
      transform: scale(1);
    }
  }
  :valid {
    & + label {
      bottom: 100%;
      left: 0;
      transform: translate3d(0, 0, 0);
    }
    & ~ div {
      transform: scale(1);
    }
  }
`

interface Props extends React.InputHTMLAttributes<HTMLElement>{
  inputId: string,
  inputType?: string,
  inputName?: string,
  value?: string | number,
}
const InputText = ({ inputId, inputType = 'text', inputName = "name", value, onChange }: Props) => {
  
  return (
    <InputBox>
      <input type={inputType} autoComplete="off" style={{display: 'none'}}/>
      <Input 
        type={inputType}
        id={inputId} 
        // value={value}
        onChange={onChange}
        autoComplete="new-password"
        required/>
      <Label htmlFor={inputId}>{inputName}</Label>
      <Line/>
    </InputBox>
  )
}
export default InputText;