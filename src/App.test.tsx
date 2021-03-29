import { render } from '@testing-library/react';
import { store } from 'app/store';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/RSLang/i)).toBeInTheDocument();
});
