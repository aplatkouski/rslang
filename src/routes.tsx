import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from 'features/mainPage/MainPage';
import SectorsPage from 'features/sectorsPage/SectorsPage';
import SectionPage from 'features/sectionPage/SectionPage';

export const useRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/sectors">
        <SectorsPage />
      </Route>
      <Route exact path="/section/:sector/:page/:color">
        <SectionPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
