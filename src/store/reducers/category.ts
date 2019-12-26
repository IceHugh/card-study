import {
  CateState,
  Action,
  CATE_ADD_ARR,
  CATE_ADD,
  CATE_INIT,
  CATE_ACTIVE,
  CATE_ADD_CARD,
} from '../types';
import customStorage from 'customStorage';
import { CategorysData } from 'types';
const initState: CateState = {
  index: 0,
  categorys: [],
};

const categorys = (state = initState, actions: Action): CateState => {
  const { categorys, index } = state;
  let _newCategorys: CategorysData;
  switch (actions.type) {
    case CATE_INIT:
      return {
        index,
        categorys: actions.payload.categorys,
      };
    case CATE_ADD_ARR:
      _newCategorys = categorys.concat(actions.payload.categorys);
      customStorage.categorys.set(_newCategorys);
      return {
        index,
        categorys: _newCategorys,
      };
    case CATE_ADD:
      _newCategorys = [...categorys, actions.payload.category];
      const _index = _newCategorys.length - 1;
      customStorage.categorys.set(_newCategorys);
      return {
        index: _index,
        categorys: _newCategorys,
      };
    case CATE_ADD_CARD:
      _newCategorys = categorys.map(val =>
        val.ulid === actions.payload.ulid
          ? { ...val, cards: [...val.cards, actions.payload.card] }
          : val
      );
      return {
        index,
        categorys: _newCategorys,
      };
    case CATE_ACTIVE:
      return {
        index: actions.payload.index,
        categorys,
      };
    default:
      return state;
  }
};
export default categorys;
