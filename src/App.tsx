import React, { Component } from 'react';
import Router from './router';
import './styles/reset.css';
import './styles/theme.css';
import './styles/layout.css';

class App extends Component {
  render() {
    return (
      <main className="theme__black app__container">
        <div className="router__container">
          <Router />
        </div>
      </main>
    );
  }
}

export default App;
