import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { ReactComponent as Logo } from './logo.svg';

const Counter = lazy(() => import('features/counter/Counter'));

const App = (): JSX.Element => (
  <BrowserRouter>
    <div className="app">
      <header className="app-header">
        <Logo className="app-logo" title="logo" />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route component={Counter} exact path="/" />
          </Switch>
        </Suspense>
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
  </BrowserRouter>
);

export default App;
