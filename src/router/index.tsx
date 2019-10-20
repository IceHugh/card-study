import React, { ReactNode, FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import 'styles/route.css';
// import Login from 'pages/Login';

interface Routes {
  path: string;
  component?: FC | any;
}
const CardEditor = loadable(() => import('../pages/CardEditor'));
const Home = loadable(() => import('../pages/Home'));
const SearchList = loadable(() => import('../pages/SearchList'));
const routes: Routes[] = [
  {
    path: '/editor',
    component: CardEditor,
  },
  {
    path: '/',
    component: Home,
  },
  {
    path: '/list',
    component: SearchList,
  },
];
const router = () => {
  return (
    <Router>
      <Route
        render={({ location }): ReactNode => (
          <TransitionGroup className='container'>
            <CSSTransition
              key={location.pathname}
              classNames='fade'
              timeout={300}
              appear={true}
              onExit={() => console.log(123)}>
              <Switch location={location}>
                {routes.map((route: Routes, i: number) => (
                  <Route
                    exact
                    path={route.path}
                    key={i}
                    component={route.component}
                  />
                ))}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>
  );
};
export default router;
