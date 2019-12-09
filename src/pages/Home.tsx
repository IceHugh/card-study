import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import localForage from 'localforage';
import {
  CardContent,
  CustomButton,
  CardsHorz,
  CategoryList,
  CategoryForm,
  LoginForm,
  Avatar,
} from 'components';
import { ItemData, CategoryData } from 'types';
import categoryManage from 'utils/categoryManage';
import { toast } from 'react-toastify';

const PageContainer = styled.main`
  width: 100vw;
  height: 100vh;
  background: #000;
  position: relative;
`;
const GridBox = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  grid-template-columns: 200px 1fr;
  grid-template-rows: ${(prop: any) =>
    prop.show ? '120px 1fr 120px' : '1fr 300px 1fr'};
  grid-template-areas: 'a b' 'a c' 'a d';
  transition: all 2s;
`;
const GridA = styled.div`
  grid-area: a;
`;
const GridB = styled.div`
  grid-area: b;
  border-left: 2px solid var(--color-3);
  border-bottom: 2px solid var(--color-3);
  box-shadow: 0 0 10px 0 var(--color-3) inset;
  border-bottom-left-radius: 10px;
  overflow: hidden;
  display: flex;
`;
const GridC = styled.div`
  width: 100%;
  min-height: 100%;
  min-width: 100%;
  grid-area: c;
`;
const GridD = styled.div`
  grid-area: d;
  border-left: 2px solid var(--color-3);
  border-top: 2px solid var(--color-3);
  box-shadow: 0 0 10px 0 var(--color-3) inset;
  border-top-left-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;
const GridDRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const AvatarBox = styled.div`
  margin: 0 100px;
`;

const FormBox = styled.div`
  border-top-left-radius: 10px;
  height: 100%;
  width: ${(prop: any) => (prop.show ? '300px' : '0')};
  overflow: hidden;
  transform: ${(prop: any) =>
    prop.show ? 'translateX(0)' : 'translateX(-120%)'};
  transition: transform 0.5s;
`;
const CardList = (props: RouteComponentProps) => {
  const { history } = props;
  const [cards, setCards] = useState();
  const [cardContentData, setCardContent] = useState();
  const [showContent, setShowContent] = useState(false);
  const [selectIndex, setSelectIndex] = useState(-1);
  const initCaregeorys: CategoryData[] = [];
  const [categorys, setCategorys] = useState(initCaregeorys);
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
    setCategoryShow(true);
  };
  const createCard = () => {
    const currCategory = categorys[selectIndex];
    if (currCategory) {
      history.replace({
        pathname: 'editor',
        state: { category: currCategory.ulid, type: currCategory.type },
      });
    } else {
      toast.error('请先新建分类');
    }
  };
  const saveCategoryForLocal = async (category: CategoryData) => {
    let categorysLocal: CategoryData[] = await localForage.getItem('categorys');
    if (categorysLocal) {
      categorysLocal.push(category);
    } else {
      categorysLocal = [category];
    }
    await localForage.setItem('categorys', categorysLocal);
  };
  const addCategoryList = (newCategorys: CategoryData[]) => {
    const currCategorys = [...categorys, ...newCategorys];
    setCategorys(currCategorys);
    return currCategorys.length;
  };
  const saveCategory = async (category: CategoryData) => {
    await saveCategoryForLocal(category);
    const len = addCategoryList([category]);
    setSelectIndex(len - 1);
    setCategoryShow(false);
  };
  const hideCategoryForm = () => {
    setCategoryShow(false);
  };
  const getCardsFromLocal = async (category: CategoryData) => {
    const localCards: any[] = await categoryManage.getLocalCardsByUlid(
      category.ulid
    );
    return localCards;
  };
  const setCurrCategoryCards = async (category: CategoryData) => {
    if (category.cards) {
      setCards(category.cards);
    }
  };
  const getCategorysFromLocal = async () => {
    let categorysLocal: CategoryData[] = await categoryManage.getListFromLocal();
    if (categorysLocal.length > 0) {
      addCategoryList(categorysLocal);
      setSelectIndex(0);
    }
  };
  const getCategoryFromLocal = async (ulid: string) => {
    let categorysLocal: CategoryData[] = await localForage.getItem(ulid);
    return categorysLocal || [];
  };
  const categorySelect = (index: number) => {
    console.log(index);
    setCardContent('');
    setSelectIndex(index);
    // getCardsFromLocal(categorys[index]);
  };
  const categoryDel = async (index: number) => {
    const currCategory = categorys[index];
    if (currCategory) {
      const _categorys = await categoryManage.removeLocalByUlid(
        currCategory.ulid
      );
      if (_categorys) {
        setCategorys(_categorys);
        setSelectIndex(index - 1);
      }
    }
  };
  const categorySync = async (index: number) => {
    const currCategory = categorys[index];
    categoryManage.syncCardsByUlid(currCategory.ulid);
  };
  const removeLocalCards = async () => {
    console.log('remove');
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
    console.log(token);
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
    getCategorysFromLocal();
    hasLogin();
  }, []);
  useEffect(() => {
    const currCategory = categorys[selectIndex];
    console.log(currCategory);
    if (currCategory) {
      setCurrCategoryCards(currCategory);
    }
  }, [selectIndex]);
  return (
    <PageContainer>
      <GridBox show={showContent}>
        <GridA>
          <CategoryList
            categorys={categorys}
            selectIndex={selectIndex}
            onSelect={categorySelect}
            onDel={categoryDel}
            onSync={categorySync}
          />
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
export default CardList;
