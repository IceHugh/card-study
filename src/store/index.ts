import { createStore, applyMiddleware, compose } from 'redux';

import reducers from 'store/reducers';
import epicMiddleware, { epics } from 'store/epics';

const rootMiddleware = [epicMiddleware];
const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(...rootMiddleware))
);
console.log(store);
epicMiddleware.run(epics);
export default store;
