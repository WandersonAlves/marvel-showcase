import { IAPIResponse } from '../../interfaces/CommonInterface';
import { ICharacter } from '../../interfaces/CharacterInterface';
import API from '..';

export const getMarvelCharacters = (params: { offset?: number; limit?: number; nameStartsWith?: string }) =>
  API.get<IAPIResponse<ICharacter>>('/v1/public/characters', { params });
