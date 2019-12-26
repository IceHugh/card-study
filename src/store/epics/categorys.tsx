import { from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Epic } from 'redux-observable';

import { CATE_GET_LOCAL } from '../types';

import * as actions from 'store/actions';
import categoryManage from 'utils/categoryManage';
import { RootState, Action } from '../types';

const initCategorysEpic: Epic<Action, Action, RootState> = action$ => {
  return action$.pipe(
    ofType(CATE_GET_LOCAL),
    switchMap(() =>
      from(categoryManage.getListFromLocal()).pipe(map(actions.initCategorys))
    )
  );
};
export default [initCategorysEpic];
