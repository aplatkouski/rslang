import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Navbar from 'app/navbar/Navbar';
import MainPage from 'app/mainPage/MainPage';
import SectorsPage from 'features/sectorsPage/SectorsPage';
import SectionPage from 'app/sectionPage/SectionPage';
import { logInViaLocalStorage } from 'features/user/userSlice';
import { getSettingsFromLocalStorage } from 'features/settings/settingsSlice';
import HardOrDeletedWordsPage from 'features/hardOrDeletedWordsPage/HardOrDeletedWordsPage';
import StudiedWordsPage from 'features/studiedWordsPage/StudiedWordsPage';
import StatisticPage from './app/statisticPage/StatisticPage';
import TeamPage from './app/TeamPage/TeamPage';
import { ROUTES } from './constants';

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logInViaLocalStorage());
    dispatch(getSettingsFromLocalStorage());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route component={MainPage} exact path="/" />
        <Route component={SectorsPage} exact path="/sectors" />
        <Route component={SectionPage} exact path="/section/:sector/:page/:color" />
        <Route component={TeamPage} exact path="/about-team" />
        <Route
          component={HardOrDeletedWordsPage}
          exact
          path="/hardOrDeletedSection/:indicator/:sector/:page/:dbRefPage/:color"
        />
        <Route
          component={StudiedWordsPage}
          exact
          path="/studiedSection/:sector/:page/:color"
        />
        <Route component={StatisticPage} exact path={ROUTES.statistic} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
