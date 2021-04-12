import Footer from 'app/footer/Footer';
import MainPage from 'app/main-page/MainPage';
import Navbar from 'app/navbar/Navbar';
import StatisticPage from 'app/statistic-page/StatisticPage';
import TeamPage from 'app/TeamPage/TeamPage';
import { useAppDispatch } from 'common/hooks';
import { fetchGameStatistics } from 'features/game-statistics/gameStatisticsSlice';
import games from 'features/games';
import Game from 'features/games/Game';
import { fetchGames } from 'features/games/gamesSlice';
import SectorsPage from 'features/sectors-page/SectorsPage';
import { getSettingsFromLocalStorage } from 'features/settings/settingsSlice';
import { fetchUserWords } from 'features/user-words/userWordsSlice';
import { logInViaLocalStorage } from 'features/user/userSlice';
import { fetchWordStatistics } from 'features/word-statistics/wordStatisticsSlice';
import TextBook, {
  DeletedWordsSection,
  DifficultWordsSection,
  StudiedWordsSection,
} from 'features/words';
import { fetchWords } from 'features/words/wordsSlice';
import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from './constants';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logInViaLocalStorage());
    dispatch(getSettingsFromLocalStorage());
    dispatch(fetchGames(null));
    dispatch(fetchWords(null));
    dispatch(fetchUserWords(null));
    dispatch(fetchWordStatistics(null));
    dispatch(fetchGameStatistics(null));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route component={MainPage} exact path="/" />
        <Route component={SectorsPage} exact path="/textbook" />
        <Route component={TeamPage} exact path="/about-team" />
        <Route component={games.GamesPage} exact path="/games" />
        <Route component={TextBook} exact path="/textbook/:group/:page" />
        <Route
          component={StudiedWordsSection}
          exact
          path="/textbook/dictionary/studied/:group/:page"
        />
        <Route
          component={DifficultWordsSection}
          exact
          path="/textbook/dictionary/difficult/:group/:page"
        />
        <Route component={Game} exact path="/games/audio-call" />
        <Route
          component={DeletedWordsSection}
          exact
          path="/textbook/dictionary/deleted/:group/:page"
        />
        <Route component={StatisticPage} exact path={ROUTES.statistic} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
