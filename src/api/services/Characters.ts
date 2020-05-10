import { IAPIResponse } from '../../interfaces/CommonInterface';
import { ICharacter } from '../../interfaces/CharacterInterface';
import API from '..';

export const getMarvelCharacters = (params: { offset?: number; limit?: number; nameStartsWith?: string }) =>
  API.get<IAPIResponse<ICharacter>>('/characters', { params });

export const getMarvelCharacter = (charID: number) => API.get<IAPIResponse<ICharacter>>(`/characters/${charID}`);
