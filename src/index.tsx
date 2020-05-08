import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import AppShell from './features/AppShell';
import GlobalStyle from './components/Blocks/Body';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <AppShell />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
