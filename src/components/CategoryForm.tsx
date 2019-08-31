import React, { useState } from 'react';
import styled from 'styled-components';
import { CategoryData } from 'types';
import CreateButton from './CreateButton';
import { ulid } from 'ulid';
import { toast } from 'react-toastify';

const CreateContainer = styled.div`
  width: 100%;
  height: 100%;
  min-width: 260px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;
const CreateTitle = styled.input`
  width: 300px;
  height: 30px;
  background: var(--color-1);
  text-align: center;
  color: #fff;
  border-top-left-radius: 10px;
  margin-bottom: 10px;
`;
const CreateDesc = styled.textarea`
  width: 300px;
  height: 30px;
  resize: none;
  background: var(--color-1);
  padding: 10px;
  color: #fff;
  border-bottom-right-radius: 10px;
  flex: 1;
  margin-bottom: 10px;
`;
const ContainerBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
interface CategoryFormProps {
  onSave?: (category: CategoryData) => void;
}
const CategoryForm = (props: CategoryFormProps) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const descChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };
  const save = () => {
    const { onSave } = props;
    if (!title) {
      toast.error('请输入分类标题');
      return;
    }
    const category: CategoryData = {
      category: title,
      desc,
      date: +new Date(),
      auth: 'hugh',
      type: 'client',
      ulid: ulid(),
      cards: [],
    };
    onSave && onSave(category);
  };
  return (
    <CreateContainer>
      <CreateTitle
        maxLength='20'
        placeholder='输入分类标题'
        onChange={titleChange}
      />
      <CreateDesc
        maxLength='120'
        placeholder='输入分类描述'
        onChange={descChange}
      />
      <ContainerBottom>
        <CreateButton name='保存' onClick={save} />
      </ContainerBottom>
    </CreateContainer>
  );
};
export default CategoryForm;
