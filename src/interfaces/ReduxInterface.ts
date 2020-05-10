import { ICharacter } from './CharacterInterface';

export interface IReduxAction {
  type: string;
  [payload: string]: any;
}

export interface IHeroesListState {
  heroes: ICharacter[];
  searchedHeroes: ICharacter[];
  isLoading: boolean;
  hasErrorOnLoading: boolean;
}

export interface IEditedHeroesListState {
  heroes: IEditedHero[];
}

export interface IEditedHero {
  id: number;
  isGoodGuy?: boolean;
  isBadGuy?: boolean;
  customDescription?: string;
  customName?: string;
  rating?: number;
}

export interface IReduxStore {
  heroes: IHeroesListState;
  editedHeroes: IEditedHeroesListState;
}
