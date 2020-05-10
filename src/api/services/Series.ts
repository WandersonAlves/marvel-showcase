import { IAPIResponse } from "../../interfaces/CommonInterface";
import { ISerie } from "../../interfaces/SerieInterface";
import API from "..";

export const getCharacterSeries = (charID: number) => API.get<IAPIResponse<ISerie>>(`/characters/${charID}/series`);