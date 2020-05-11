import { IAPIResponse } from '../../interfaces/CommonInterface';
import { ISerie } from '../../interfaces/SerieInterface';
import API from '..';

interface IGetCharactersSeriesParams {
  offset: number;
  limit: number;
}
export const getCharacterSeries = (charID: number, params: IGetCharactersSeriesParams) =>
  API.get<IAPIResponse<ISerie>>(`/characters/${charID}/series`, { params });
