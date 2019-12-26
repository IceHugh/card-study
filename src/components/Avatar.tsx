import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import defaultAvatar from 'assets/images/avatar-default.png';

const AvatarBox = styled.aside`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  /* background: #fff; */
  box-shadow: 0 0 2px 5px var(--color-2);
  position: relative;
`;
const ButtonsContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
`;
const Button = styled.button`
  width: 100%;
  height: 50%;
  text-align: center;
  color: var(--color-1);
  background: var(--color-3);
  transition: opacity 0.5;
  cursor: pointer;
  /* margin: 0 10px; */
  &:active {
    opacity: 0.7;
  }
  &:hover {
    opacity: 0.9;
  }
`;
const AvatarImageBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--color-1);
  padding: 10px;
  border-radius: 50%;
  overflow: hidden;
`;
const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
`;

interface AvatarProps {
  loginStatus?: boolean;
  onClickLogin?: () => void;
  onClickSignIn?: () => void;
}
const Avatar = (props: AvatarProps) => {
  const { loginStatus, onClickLogin, onClickSignIn } = props;
  const [showAvatar, setShowAvatar] = useState(false);
  const loginHander = (type: string) => {
    const handler = type === 'login' ? onClickLogin : onClickSignIn;
    handler && handler();
  };
  useEffect(() => {
    if (loginStatus) {
      setShowAvatar(true);
    }
  }, [loginStatus]);
  return (
    <AvatarBox>
      {showAvatar ? (
        <AvatarImageBox>
          <AvatarImage src={defaultAvatar} />
        </AvatarImageBox>
      ) : (
        <ButtonsContainer>
          <Button onClick={() => loginHander('login')}>登录</Button>
          <Button onClick={() => loginHander('siginin')}>注册</Button>
        </ButtonsContainer>
      )}
    </AvatarBox>
  );
};
export default Avatar;
