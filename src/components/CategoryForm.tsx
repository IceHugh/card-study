import React, { useState } from 'react';
import styled from 'styled-components';
import { CategoryData } from 'types';
import Button from './CustomButton';
import { toast } from 'react-toastify';
import generateUlid from 'utils/generateUlid';
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
  onHide?: () => void;
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
    const _ulid = generateUlid();
    const category: CategoryData = {
      name: title,
      desc,
      careteDate: +new Date(),
      authName: 'hugh',
      authId: '',
      type: 'client',
      ulid: _ulid,
      cards: [],
    };
    onSave && onSave(category);
  };
  const hide = () => {
    const { onHide } = props;
    onHide && onHide();
  };
  return (
    <CreateContainer>
      <CreateTitle
        maxLength='20'
        autoFocus
        placeholder='输入分类标题'
        onChange={titleChange}
      />
      <CreateDesc
        maxLength='120'
        placeholder='输入分类描述'
        onChange={descChange}
      />
      <ContainerBottom>
        <Button name='保存' onClick={save} />
        <Button name='取消' onClick={hide} />
      </ContainerBottom>
    </CreateContainer>
  );
};
export default CategoryForm;
