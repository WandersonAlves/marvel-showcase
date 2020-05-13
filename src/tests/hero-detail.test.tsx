import { getCharacterSeries } from '../api/services/Series';
import { getMarvelCharacter } from '../api/services/Characters';
import { Setup } from './test-utils';
import { waitForElement, cleanup } from '@testing-library/react';
import fetchCharMock from './mocks/fetch1011334Char.json';
import fetchSeriesMock from './mocks/fetch1011334Series.json';
import HeroDetails from '../features/hero-details';
import React from 'react';

jest.mock('../api/services/Characters.ts');
jest.mock('../api/services/Series.ts');

afterEach(cleanup);

describe('Hero detail test suite', () => {
  beforeEach(() => {
    // @ts-ignore
    getMarvelCharacter.mockResolvedValue({ data: fetchCharMock });
    // @ts-ignore
    getCharacterSeries.mockResolvedValue({ data: fetchSeriesMock });
  });

  it('Should load char details', async () => {
    const props = {
      heroID: '1011334'
    };
    const { getByTestId, history } = await Setup(<HeroDetails { ...props }/>, { route: '/hero-details/1011334'});

    expect(history.location.pathname).toEqual('/hero-details/1011334');
    const charDetailContainer = await waitForElement(() => getByTestId('hero-details-1011334'));
    expect(charDetailContainer).toBeInTheDocument();
  });
});
