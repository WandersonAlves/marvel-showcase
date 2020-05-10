import { IAPIResponse } from '../interfaces/CommonInterface';
import { ICharacter } from '../interfaces/CharacterInterface';

export const GetCharactersFactory = (req: IAPIResponse<ICharacter>): ICharacter[] => req.data.results.map(c => c);
export const GetNullableCharacterFactory = (): ICharacter => ({
  id: 0,
  name: '',
  description: '',
  modified: '',
  resourceURI: '',
  urls: [],
  thumbnail: {
    extension: '',
    path: '',
  },
  comics: {
    available: 0,
    returned: 0,
    collectionURI: '',
    items: [],
  },
  series: {
    available: 0,
    returned: 0,
    collectionURI: '',
    items: [],
  },
  stories: {
    available: 0,
    returned: 0,
    collectionURI: '',
    items: [],
  },
  events: {
    available: 0,
    returned: 0,
    collectionURI: '',
    items: [],
  },
});
