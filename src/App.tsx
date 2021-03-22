import React from 'react';
import './App.scss';
import { Counter } from './features/counter/Counter';
import logo from './logo.svg';

const App = (): JSX.Element => (
  <div className="app">
    <header className="app-header">
      <img alt="logo" className="app-logo" src={logo} />
      <Counter />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <span>
        <span>Learn </span>
        <a
          className="app-link"
          href="https://reactjs.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          React
        </a>
        <span>, </span>
        <a
          className="app-link"
          href="https://redux.js.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Redux
        </a>
        <span>, </span>
        <a
          className="app-link"
          href="https://redux-toolkit.js.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Redux Toolkit
        </a>
        ,<span> and </span>
        <a
          className="app-link"
          href="https://react-redux.js.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          React Redux
        </a>
      </span>
    </header>
  </div>
);

export default App;
