import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './CustomButton';
import { toast } from 'react-toastify';
import md5 from 'md5';
import Api from 'api';
import localForage from 'localforage';

const FormContainer = styled.div`
  width: 260px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const InputItem = styled.input`
  width: 100%;
  height: 30px;
  background: var(--color-1);
  text-align: center;
  color: #fff;
  margin-bottom: 10px;
`;
const CotainerTop = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ContainerBottom = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
`;
// type TypeProp = 'login' | 'sign';
interface CategoryFormProps {
  // onLogin?: (category: CategoryData) => void;
  // onLogin?: (category: CategoryData) => void;
  type?: string;
  onHide?: () => void;
  onSuccess?: () => void;
}
const CategoryForm = ({ type, ...props }: CategoryFormProps) => {
  const [formType, setFormType] = useState('sign');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRPassword] = useState('');

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const rpasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRPassword(e.target.value);
  };
  const hide = () => {
    const { onHide } = props;
    onHide && onHide();
  };
  const validNameAndPass = () => {
    if (!username || !password) {
      toast.error('用户名或密码不能为空');
      return null;
    }
    if (formType === 'sign') {
      if (!rpassword || rpassword !== password) {
        toast.error('确认密码不能为空');
        return null;
      }
    }
    const md5Paddword = md5(password);
    return {
      username,
      password: md5Paddword,
    };
  };
  const loginOrSign = async () => {
    console.log('登录');
    let ajaxPromise;
    let message;
    if (formType === 'login') {
      ajaxPromise = Api.login;
      message = '登录成功!';
    } else {
      ajaxPromise = Api.signin;
      message = '注册成功!';
    }
    const authParams = validNameAndPass();
    if (authParams) {
      try {
        const loginData: any = await ajaxPromise(authParams).json();
        console.log(loginData);
        const { token } = loginData.data;
        if (token) {
          localForage.setItem('token', token);
        }
        toast.success(`${message}`);
        props.onSuccess && props.onSuccess();
      } catch (error) {
        message = error.message || '系统错误!';
        toast.success(message);
      }
      hide();
    }
  };
  useEffect(() => {
    type && setFormType(type);
  }, [type]);
  return (
    <FormContainer>
      <CotainerTop>
        <InputItem
          maxLength='20'
          autoFocus
          placeholder='输入用户名'
          onChange={nameChange}
        />
        <InputItem
          maxLength='20'
          autoFocus
          placeholder='输入密码'
          type='password'
          onChange={passwordChange}
        />
        {formType === 'sign' && (
          <InputItem
            maxLength='20'
            autoFocus
            placeholder='确认密码'
            type='password'
            onChange={rpasswordChange}
          />
        )}
      </CotainerTop>
      <ContainerBottom>
        <Button
          name={formType === 'login' ? '登录' : '注册'}
          onClick={loginOrSign}
        />
        <Button name='取消' onClick={hide} />
      </ContainerBottom>
    </FormContainer>
  );
};
export default CategoryForm;
