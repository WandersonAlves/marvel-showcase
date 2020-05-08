import { IUrl, IResourceAPI, IThumbnail } from './CommonInterface';

export interface ICharacter {
  id: number;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  urls: IUrl[];
  thumbnail: IThumbnail;
  comics: IResourceAPI;
  series: IResourceAPI;
  stories: IResourceAPI;
  events: IResourceAPI;
}
