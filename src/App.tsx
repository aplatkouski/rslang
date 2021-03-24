import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from 'features/navbar/Navbar';
import { useRoutes } from './routes';

const App = (): JSX.Element => {
  const routes = useRoutes();

  return (
    <BrowserRouter>
      <Navbar />
      <div>{routes}</div>
    </BrowserRouter>
  );
};

export default App;
