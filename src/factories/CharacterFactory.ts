import { IAPIResponse } from '../interfaces/CommonInterface';
import { ICharacter } from '../interfaces/CharacterInterface';

export const GetCharactersFactory = (req: IAPIResponse<ICharacter>): ICharacter[] => req.data.results.map(c => c);
