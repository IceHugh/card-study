import { createEpicMiddleware, combineEpics } from 'redux-observable';
import categorys from './categorys';
import { Action, RootState } from '../types';

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();
export const epics = combineEpics(...categorys);

export default epicMiddleware;
