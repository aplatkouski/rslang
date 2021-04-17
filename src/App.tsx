import Footer from 'app/footer/Footer';
import MainPage from 'app/main-page/MainPage';
import Navbar from 'app/navbar/Navbar';
import TeamPage from 'app/ream-page/TeamPage';
import RegistrationForm from 'app/registration-form/RegistrationForm';
import SideMenu from 'app/side-menu/SideMenu';
import StatisticPage from 'app/statistic-page/StatisticPage';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { fetchGameStatistics } from 'features/game-statistics/gameStatisticsSlice';
import games from 'features/games';
import Game from 'features/games/Game';
import { fetchGames } from 'features/games/gamesSlice';
import LogInForm from 'features/log-in-form/LogInForm';
import SectorsPage from 'features/sectors/SectorsPage';
import { getSettingsFromLocalStorage } from 'features/settings/settingsSlice';
import { fetchUserWords } from 'features/user-words/userWordsSlice';
import {
  delLogInErrMessage,
  getCurrUser,
  getLoginStatus,
  logInViaLocalStorage,
} from 'features/user/userSlice';
import { fetchWordStatistics } from 'features/word-statistics/wordStatisticsSlice';
import TextBook, {
  DeletedWordsSection,
  DifficultWordsSection,
  StudiedWordsSection,
} from 'features/words';
import { fetchWords } from 'features/words/wordsSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { requestStatus, ROUTES } from './constants';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [drawerState, setDrawerState] = useState(false);
  const [isOpenLogInModal, setIsOpenLogInModal] = useState(false);
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);

  const logInStatus = useAppSelector(getLoginStatus);
  const user = useAppSelector(getCurrUser);

  useEffect(() => {
    dispatch(logInViaLocalStorage());
    dispatch(getSettingsFromLocalStorage());
    dispatch(fetchGames(null));
    dispatch(fetchWords(null));
    dispatch(fetchUserWords(null));
    dispatch(fetchWordStatistics(null));
    dispatch(fetchGameStatistics(null));
  }, [dispatch]);

  useEffect(() => {
    if (user && user.token && isOpenLogInModal) {
      setIsOpenLogInModal(false);
      dispatch(delLogInErrMessage());
    }
  }, [dispatch, isOpenLogInModal, user]);

  const handleToggleSideMenu = useCallback(() => {
    setDrawerState((state) => !state);
  }, []);

  const handleOpenLogInModal = useCallback(() => {
    setIsOpenLogInModal(true);
  }, []);

  const handleCloseLogInModal = useCallback(() => {
    if (logInStatus !== requestStatus.pending) {
      setIsOpenLogInModal(false);
      dispatch(delLogInErrMessage());
    }
  }, [dispatch, logInStatus]);

  const handleRegister = useCallback(() => {
    setIsOpenLogInModal(false);
    dispatch(delLogInErrMessage());
    setIsOpenRegisterModal(true);
  }, [dispatch]);

  const handleCloseRegisterModal = useCallback(() => {
    setIsOpenRegisterModal(false);
  }, []);

  return (
    <BrowserRouter>
      <SideMenu onClose={handleToggleSideMenu} open={drawerState} />
      <LogInForm
        isOpen={isOpenLogInModal}
        onClose={handleCloseLogInModal}
        onRegister={handleRegister}
      />
      <RegistrationForm isOpen={isOpenRegisterModal} onClose={handleCloseRegisterModal} />

      <Navbar
        onOpenLogInModal={handleOpenLogInModal}
        onToggleSideMenu={handleToggleSideMenu}
      />
      <Switch>
        <Route component={MainPage} exact path={ROUTES.main.url} />
        <Route component={SectorsPage} exact path={ROUTES.textbook.url} />
        <Route component={TeamPage} exact path={ROUTES.aboutTeam.url} />
        <Route component={games.GamesPage} exact path={ROUTES.games.url} />
        <Route component={TextBook} exact path={`${ROUTES.textbook.url}/:group/:page`} />
        <Route
          component={StudiedWordsSection}
          exact
          path={`${ROUTES.studied.url}/:group/:page`}
        />
        <Route
          component={DifficultWordsSection}
          exact
          path={`${ROUTES.difficult.url}/:group/:page`}
        />
        <Route component={Game} exact path={`${ROUTES.games.url}/:gameId`} />
        <Route
          component={DeletedWordsSection}
          exact
          path={`${ROUTES.deleted.url}/:group/:page`}
        />
        <Route component={StatisticPage} exact path={ROUTES.statistics.url} />
        <Redirect to={ROUTES.main.url} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
