import { createMemoryHistory, MemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { render, act, RenderResult } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Store } from 'redux';
import CreatedStore from '../store';
import React from 'react';

interface SetupProps {
  route?: string;
  history?: MemoryHistory;
}

interface SetupPromiseReturn extends RenderResult {
  store: Store;
  history: MemoryHistory;
}

const makeTestStore = (opts = {}) => {
  const store = CreatedStore;
  const origDispatch = store.dispatch;
  store.dispatch = jest.fn(origDispatch);
  return store;
};

export const Setup = (
  Component: JSX.Element,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) }: SetupProps = {},
): Promise<SetupPromiseReturn> => {
  const store = makeTestStore();
  return new Promise(resolve => {
    act(() => {
      resolve({
        ...render(
          <Provider store={store}>
            <Router history={history}>{Component}</Router>
          </Provider>,
        ),
        store,
        history,
      });
    });
  });
};
