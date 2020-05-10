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

export interface IReduxStore {
  heroes: IHeroesListState;
}
