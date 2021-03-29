import Footer from 'app/footer/Footer';
import MainPage from 'app/main-page/MainPage';
import Navbar from 'app/navbar/Navbar';
import SectionPage from 'app/sectionPage/SectionPage';
import StatisticPage from 'app/statisticPage/StatisticPage';
import TeamPage from 'app/TeamPage/TeamPage';
import games from 'features/games';
import { fetchGames } from 'features/games/gamesSlice';
import HardOrDeletedWordsPage from 'features/hardOrDeletedWordsPage/HardOrDeletedWordsPage';
import SectorsPage from 'features/sectorsPage/SectorsPage';
import { getSettingsFromLocalStorage } from 'features/settings/settingsSlice';
import StudiedWordsPage from 'features/studiedWordsPage/StudiedWordsPage';
import { logInViaLocalStorage } from 'features/user/userSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from './constants';
import MiniGamesPage from './app/MiniGamesPage/MiniGamesPage';

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logInViaLocalStorage());
    dispatch(getSettingsFromLocalStorage());
    dispatch(fetchGames(null));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route component={MainPage} exact path="/" />
        <Route component={SectorsPage} exact path="/sectors" />
        <Route component={SectionPage} exact path="/section/:sector/:page/:color" />
        <Route component={TeamPage} exact path="/about-team" />
        <Route component={games.GamesPage} exact path="/games" />
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
        <Route component={MiniGamesPage} exact path="/mini-games" />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
