import { act } from 'react-dom/test-utils';
import { getMarvelCharacters } from '../api/services/Characters';
import { Setup } from './test-utils';
import { waitForElement, fireEvent, cleanup } from '@testing-library/react';
import fetchCharMock from './mocks/fetchChar.json';
import fetchCharNoResults from './mocks/fetchCharNoResults.json';
import HeroesList from '../features/heroes-list';
import React from 'react';

jest.mock('../api/services/Characters.ts');

afterEach(cleanup);

describe('Heroes List test suite', () => {
  beforeEach(() => {
    // @ts-ignore
    getMarvelCharacters.mockResolvedValue({ data: fetchCharMock });
  });

  it('Should render a card', async () => {
    const { getByTestId } = await Setup(<HeroesList />);
    const charNode = await waitForElement(() => getByTestId('char-1011334'));
    expect(charNode).toBeInTheDocument();
  });

  it('Should render more cards on scroll to bottom', async () => {
    await act(async () => {
      const { getByTestId } = await Setup(<HeroesList />);
      const container = await waitForElement(() => getByTestId('hero-list-container'));

      fireEvent.scroll(container, { target: { scrollY: 1000 } });
      // @ts-ignore
      getMarvelCharacters.mockResolvedValue({ data: fetchCharNoResults });
    });
    expect(getMarvelCharacters).toHaveBeenCalledWith({ offset: 20, limit: 20 });
  });

  it('Should render search cards', async () => {
    const { getByTestId } = await Setup(<HeroesList />);
    const marvelInputNode = await waitForElement(() => getByTestId('marvel-input'));
    fireEvent.change(marvelInputNode, { target: { value: 'spid' } });

    // Simulates debounce
    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, 550),
    );

    expect(getMarvelCharacters).toHaveBeenCalledWith({ nameStartsWith: 'spid' });
  });
});
