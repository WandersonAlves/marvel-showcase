import { IAPIResponse } from '../../interfaces/CommonInterface';
import { ICharacter } from '../../interfaces/CharacterInterface';
import API from '..';

export const GetCharacters = (offset = 0, limit = 20) => API.get<IAPIResponse<ICharacter>>('/v1/public/characters');
