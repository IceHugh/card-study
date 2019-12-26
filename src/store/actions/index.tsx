import { action } from 'typesafe-actions';
import {
  CATE_ADD,
  CATE_ADD_ARR,
  CATE_GET_LOCAL,
  CATE_INIT,
  CATE_ACTIVE,
  CATE_ADD_CARD,
} from '../types';
import { CategoryData, CategorysData, CardData } from 'types';
export const getLocalCategorys = () => action(CATE_GET_LOCAL);
export const initCategorys = (categorys: CategorysData) =>
  action(CATE_INIT, {
    categorys,
  });
export const addCategorys = (categorys: CategorysData) =>
  action(CATE_ADD_ARR, {
    categorys,
  });
export const addCategory = (category: CategoryData) =>
  action(CATE_ADD, {
    category,
  });
export const activeCategory = (index: number) =>
  action(CATE_ACTIVE, {
    index,
  });
export const addCardForCate = (ulid: string, card: CardData) =>
  action(CATE_ADD_CARD, {
    ulid,
    card,
  });
