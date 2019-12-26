import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Router from 'router';
import 'styles/reset.css';
import 'styles/theme.css';
import 'styles/layout.css';
// import { hot } from 'react-hot-loader/root';
import store from 'store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <main className='theme__black app__container'>
          <div className='router__container'>
            <Router />
          </div>
        </main>
      </Provider>
    );
  }
}

export default App;
