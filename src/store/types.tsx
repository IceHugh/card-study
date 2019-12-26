import { CategorysData } from 'types';
import { ActionType } from 'typesafe-actions';
import * as actions from 'store/actions';

export const CATE_ADD = 'CATE_ADD';
export const CATE_ADD_ARR = 'CATE_ADD_ARR';
export const CATE_GET_LOCAL = 'CATE_GET_LOCAL';
export const CATE_INIT = 'CATE_INIT';
export const CATE_ACTIVE = 'CATE_ACTIVE';
export const CATE_ADD_CARD = 'CATE_ADD_CARD';

export type Action = ActionType<typeof actions>;
export interface RootState {
  category: CateState;
}
export interface CateState {
  index: number;
  categorys: CategorysData;
}
interface InitCategoryAction {
  type: typeof CATE_INIT;
  categorys: CategorysData;
}
interface AddCategoryAction {
  type: typeof CATE_ADD;
  categorys: CategorysData;
}
interface ActiveCategoryAction {
  type: typeof CATE_ACTIVE;
  index: number;
}

export type CategoryAction =
  | InitCategoryAction
  | AddCategoryAction
  | ActiveCategoryAction;
