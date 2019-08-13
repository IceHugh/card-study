import React, { useState } from 'react';
import styled from 'styled-components';
import IconAvatar from 'assets/images/icon-avatar.jpeg';
import styles from 'styles/pages/Login.module.css';

import { InputText } from 'components';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import localForage from 'localforage';
import Api from 'api';
import md5 from 'md5';

// import to from 'utils/to';
const a = 1;
const Page = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  background: var(--color-1);
`;
interface ActiveProp {
  activeStatus: boolean;
}
const LoginContainer = styled.section`
  transition: clip-path 1s cubic-bezier(1, 0.5, 0, 2);
  clip-path: ${(prop: ActiveProp) =>
    prop.activeStatus
      ? 'circle(300px at 160px 200px)'
      : 'circle(40px at 160px 200px)'};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 320px;
  height: 400px;

  overflow: hidden;
`;
const LoginBox = styled.div`
  height: 100%;
  border-radius: var(--border-radius-main);
  padding: 20px;
  background: var(--color-4);
`;
const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #000;
  overflow: hidden;
  position: relative;
  z-index: 2;
  box-sizing: content-box;
  transition: transform 1.2s;
  transform: ${(prop: ActiveProp) =>
    prop.activeStatus ? 'translateY(0)' : 'translateY(137px)'};
  margin: 0 auto 40px;
  border: 3px solid var(--color-2);
`;
const InputItem = styled.div`
  margin-bottom: 20px;
`;
const Login = (props: RouteComponentProps) => {
  const { history } = props;
  const [activeStatus, activate] = useState(false);
  const [loginStatus, activateLogin] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const login = async () => {
    activateLogin(true);
    if (!name || !password) return;
    try {
      const md5Password = md5(password);
      const response = await Api.login({
        username: name,
        password: md5Password,
      });
      const parseRes = await response.json();
      console.log(parseRes);
      await localForage.setItem('token', parseRes.data.token);
      toast.success('login success');
      history.push({ pathname: '/posts' });
    } catch (error) {
      toast.error('login error');
      console.log(error);
    } finally {
      console.log('finally');
    }
  };
  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const passwrodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  return (
    <Page>
      <LoginContainer activeStatus={activeStatus}>
        <LoginBox>
          <Avatar onClick={() => activate(true)} activeStatus={activeStatus}>
            <img className={styles.icon_avatar} src={IconAvatar} alt='avatar' />
          </Avatar>
          <form>
            <InputItem>
              <InputText
                inputId='name'
                inputType='text'
                onChange={nameChange}
                inputName='用户名'
              />
            </InputItem>
            <InputItem>
              <InputText
                inputId='password'
                inputType='password'
                onChange={passwrodChange}
                inputName='密码'
              />
            </InputItem>
          </form>
        </LoginBox>
      </LoginContainer>
    </Page>
  );
};
export default Login;
