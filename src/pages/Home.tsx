import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import localForage from 'localforage';
import {
  CardContent,
  CustomButton,
  CardsHorz,
  CategoryForm,
  LoginForm,
  Avatar,
} from 'components';
import { CategorysListConnect } from 'containers';

import { ItemData, CategoryData, CategorysData } from 'types';

import { toast } from 'react-toastify';
import {
  PageContainer,
  GridBox,
  GridA,
  GridB,
  GridC,
  GridD,
  GridDRight,
  AvatarBox,
  FormBox,
} from 'components/home';
interface HomeProps extends RouteComponentProps {
  addCategory: Function;
  activeIndex: number;
  categorys: CategorysData;
}
const Home: React.SFC<HomeProps> = (props: HomeProps) => {
  const { history, addCategory, categorys, activeIndex } = props;
  const [cards, setCards] = useState();
  const [cardContentData, setCardContent] = useState();
  const [showContent, setShowContent] = useState(false);
  const [categoryShow, setCategoryShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false);
  const [loginFormType, setLoginFormType] = useState('login');
  const [loginStatus, setLoginStatus] = useState(false);
  const itemClick = (item: ItemData) => {
    console.log(item);
    setShowContent(true);
    setCardContent(item);
  };
  const createCategory = () => {
    console.log('新建分类');
    setShowContent(false);
    setCategoryShow(true);
  };
  const createCard = () => {
    const currCategory = categorys[activeIndex];
    if (currCategory) {
      history.push({
        pathname: 'editor',
        state: { category: currCategory.ulid, type: currCategory.type },
      });
    } else {
      toast.error('请先新建分类');
    }
  };
  const saveCategory = async (category: CategoryData) => {
    addCategory(category);
  };
  const hideCategoryForm = () => {
    setCategoryShow(false);
  };
  const setCurrCategoryCards = async (category: CategoryData) => {
    if (category && category.cards) {
      setCards(category.cards);
    }
  };
  const loginOrSignInSuccess = () => {
    setLoginStatus(true);
  };
  const showLogin = () => {
    setLoginFormType('login');
    setLoginShow(true);
  };
  const showSignin = () => {
    setLoginFormType('signin');
    setLoginShow(true);
  };
  const hasLogin = async () => {
    const token = await localForage.getItem('token');
    if (token) {
      setLoginStatus(true);
    }
  };
  const hideLoginForm = () => {
    setLoginShow(false);
  };
  const toSearchList = () => {
    history.push('/list');
  };
  useEffect(() => {
    hasLogin();
  }, []);
  useEffect(() => {
    setCurrCategoryCards(categorys[activeIndex]);
  }, [activeIndex, categorys]);
  return (
    <PageContainer>
      <GridBox show={showContent}>
        <GridA>
          <CategorysListConnect />
        </GridA>
        <GridB>
          <FormBox show={loginShow}>
            <LoginForm
              onHide={hideLoginForm}
              onSuccess={loginOrSignInSuccess}
              type={loginFormType}
            />
          </FormBox>
          <GridDRight>
            {!loginShow && <CustomButton name='搜索' onClick={toSearchList} />}
            <AvatarBox>
              <Avatar
                onClickLogin={showLogin}
                onClickSignIn={showSignin}
                loginStatus={loginStatus}
              />
            </AvatarBox>
          </GridDRight>
        </GridB>
        <GridC>
          {showContent ? (
            <CardContent
              {...cardContentData}
              close={() => setShowContent(false)}
            />
          ) : (
            <CardsHorz cards={cards} itemClick={itemClick} />
          )}
        </GridC>
        <GridD>
          <FormBox show={categoryShow}>
            <CategoryForm onSave={saveCategory} onHide={hideCategoryForm} />
          </FormBox>
          <GridDRight>
            <CustomButton name='新建分类' onClick={createCategory} />
            <CustomButton name='新建卡片' onClick={createCard} />
          </GridDRight>
        </GridD>
      </GridBox>
    </PageContainer>
  );
};
export default Home;
