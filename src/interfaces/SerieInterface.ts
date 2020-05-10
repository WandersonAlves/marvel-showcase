import { IThumbnail, IUrl } from './CommonInterface';

// Don't expose all members from Marvel API since we don't use them
export interface ISerie {
  id: number;
  title: number;
  description: number;
  resourceURI: number;
  urls: IUrl[];
  startYear: number;
  endYear: number;
  rating: number;
  modified: string;
  thumbnail: IThumbnail;
}
