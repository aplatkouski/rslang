import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from 'features/navbar/Navbar';
import MainPage from 'features/mainPage/MainPage';
import SectorsPage from 'features/sectorsPage/SectorsPage';
import SectionPage from 'features/sectionPage/SectionPage';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route component={MainPage} exact path="/" />
        <Route component={SectorsPage} exact path="/sectors" />
        <Route component={SectionPage} exact path="/section/:sector/:page/:color" />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
