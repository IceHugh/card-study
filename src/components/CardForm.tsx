import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.section`
  width: 100%;
  height: 100%;
`;
const CellBox = styled.div`
  width: 100%;
  max-height: 100px;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  width: 100%;
  height: 30px;
  text-align: center;
  background: var(--color-2);
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  background: var(--color-2);
  resize: none;
  line-height: 1.3;
  padding: 5px;
`;
interface CardProps {
  titleHandler?: (t: any) => void;
  descHandler?: (t: any) => void;
  categoryHandler?: (t: any) => void;
  defaultCategory?: string;
}
const CardForm = (props: CardProps) => {
  return (
    <FormContainer>
      <CellBox>
        <Input
          type='text'
          placeholder='请输入卡片标题'
          onChange={props.titleHandler}
        />
      </CellBox>
      <CellBox>
        <TextArea
          type='text'
          placeholder='请输入卡片描述'
          onChange={props.descHandler}
        />
      </CellBox>
      {/* <CellBox>
        <Input
          type='text'
          defaultValue={props.defaultCategory}
          placeholder='请输入卡片分类'
          onChange={props.categoryHandler}
        />
      </CellBox> */}
    </FormContainer>
  );
};
export default CardForm;
