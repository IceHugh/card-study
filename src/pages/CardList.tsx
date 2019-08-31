import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import localForage from 'localforage';
import {
  ContentBox,
  CreateButton,
  CardsHorz,
  CategoryList,
  CategoryForm,
} from 'components';
import { ItemData, CategoryData } from 'types';
import categoryManage from 'utils/categoryManage';

const PageContainer = styled.main`
  width: 100%;
  height: 100%;
  background: #000;
  position: relative;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr 300px 1fr;
  grid-template-areas: 'a b' 'a c' 'a d';
`;
const CardsBox = styled.div`
  width: 100%;
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
const GridB = styled.div`
  grid-area: b;
  border-left: 2px solid var(--color-3);
  border-bottom: 2px solid var(--color-3);
  box-shadow: 0 0 10px 0 var(--color-3) inset;
  border-bottom-left-radius: 10px;
  overflow: hidden;
`;
const GridA = styled.div`
  grid-area: a;
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
  const [selectIndex, setSelectIndex] = useState(-1);
  const initCaregeorys: CategoryData[] = [];
  const [categorys, setCategorys] = useState(initCaregeorys);
  const [categoryShow, setCategoryShow] = useState(false);
  const itemClick = (item: ItemData) => {
    console.log(item);
    setCardContent(item);
  };
  const createCategory = () => {
    console.log('新建分类');
    setCategoryShow(true);
  };
  const createCard = () => {
    console.log('新建卡片');
    const currCategory = categorys[selectIndex];
    history.push({
      pathname: 'editor',
      state: { category: currCategory.ulid, type: currCategory.type },
    });
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
    console.log(category);
    await saveCategoryForLocal(category);
    const len = addCategoryList([category]);
    setSelectIndex(len - 1);
    setCategoryShow(false);
  };
  const getCardsFromLocal = async (category: CategoryData) => {
    const localCards: any[] = await categoryManage.getLocaCardsByUuid(
      category.ulid
    );
    return localCards;
  };
  const setCurrCategoryCards = async (category: CategoryData) => {
    const localCards = await getCardsFromLocal(category);
    localCards.length > 0 && setCards(localCards);
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
    let categorysLocal: CategoryData[] = await localForage.getItem('categorys');
    const currCategory = categorys[index];
    if (categorysLocal && currCategory) {
      const localCards = await getCardsFromLocal(currCategory);
      console.log(localCards);
    }
  };
  const removeLocalCards = async () => {
    const localCards: any[] = await localForage.getItem('cards');
  };
  useEffect(() => {
    getCategorysFromLocal();
  }, []);
  useEffect(() => {
    const currCategory = categorys[selectIndex];
    if (currCategory) {
      setCurrCategoryCards(currCategory);
    }
  }, [selectIndex]);
  return (
    <PageContainer>
      <ContentBox {...cardContentData} />
      <GridA>
        <CategoryList
          categorys={categorys}
          selectIndex={selectIndex}
          onSelect={categorySelect}
          onDel={categoryDel}
          onSync={categorySync}
        />
      </GridA>
      <GridB />
      <CardsBox>
        <CardsHorz cards={cards} itemClick={itemClick} />
      </CardsBox>
      <GridD>
        <FormBox show={categoryShow}>
          <CategoryForm onSave={saveCategory} />
        </FormBox>
        <GridDRight>
          <CreateButton name='新建分类' onClick={createCategory} />
          <CreateButton name='新建卡片' onClick={createCard} />
        </GridDRight>
      </GridD>
    </PageContainer>
  );
};
export default CardList;
