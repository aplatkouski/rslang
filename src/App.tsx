import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from 'app/navbar/Navbar';
import MainPage from 'app/mainPage/MainPage';
import SectorsPage from 'features/sectorsPage/SectorsPage';
import SectionPage from 'app/sectionPage/SectionPage';
import { logInViaLocalStorage } from 'features/user/userSlice';
import { useDispatch } from 'react-redux';
import TeamPage from './app/TeamPage/TeamPage';

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logInViaLocalStorage());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route component={MainPage} exact path="/" />
        <Route component={SectorsPage} exact path="/sectors" />
        <Route component={SectionPage} exact path="/section/:sector/:page/:color" />
        <Route component={TeamPage} exact path="/about-team" />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
