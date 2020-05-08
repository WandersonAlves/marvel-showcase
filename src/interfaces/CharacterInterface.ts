import { IUrl, IResourceAPI } from './CommonInterface';

export interface ICharacter {
  id: number;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  urls: IUrl[];
  comics: IResourceAPI;
  series: IResourceAPI;
  stories: IResourceAPI;
  events: IResourceAPI;
}
