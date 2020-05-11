import { IAPIResponse } from "../interfaces/CommonInterface";
import { ISerie } from "../interfaces/SerieInterface";

export const GetSeriesFactory = (req: IAPIResponse<ISerie>): ISerie[] => req.data.results.map(c => c);
