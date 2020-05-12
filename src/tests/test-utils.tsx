import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, act } from '@testing-library/react';
import { Store } from 'redux';
import CreatedStore from '../store';
import React from 'react';

interface ITestProviderProps {
  store: Store;
  children: JSX.Element;
}

const TestProvider = ({ store, children }: ITestProviderProps) => <Provider store={store}>{children}</Provider>;

export const TestRender = (Component: JSX.Element, { store, ...otherOpts }: { store: Store }) => {
  return render(<TestProvider store={store}>{Component}</TestProvider>, { wrapper: MemoryRouter, ...otherOpts });
};

export const Setup = (Component: JSX.Element): Promise<{ store: Store, getByTestId: any }> => {
  const store = makeTestStore();
  return new Promise(resolve => {
    act(() => {
      const { getByTestId } = TestRender(Component, { store });
      resolve({ getByTestId, store });
    });
  });
};

export const makeTestStore = (opts = {}) => {
  const store = CreatedStore;
  const origDispatch = store.dispatch;
  store.dispatch = jest.fn(origDispatch);
  return store;
};

export const wait = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
