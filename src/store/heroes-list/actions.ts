import {
  SET_ADD_MORE_SEARCH_HEROES,
  SET_HEROES,
  SET_ISLOADING,
  SET_ADD_MORE_HEROES,
  SET_SEARCH_HEROES,
  SET_RESET_SEARCH,
} from './actionList';
import { IAPIResponse } from '../../interfaces/CommonInterface';
import { ICharacter } from '../../interfaces/CharacterInterface';

export const setHeroesAction = (heroesResponse: IAPIResponse<ICharacter>) => ({
  type: SET_HEROES,
  heroesResponse,
});

export const setAddMoreHeroesAction = (heroesResponse: IAPIResponse<ICharacter>) => ({
  type: SET_ADD_MORE_HEROES,
  heroesResponse,
});

export const setAddMoreSearchHeroesAction = (heroesResponse: IAPIResponse<ICharacter>) => ({
  type: SET_ADD_MORE_SEARCH_HEROES,
  heroesResponse,
});

export const setSearchHeroesAction = (heroesResponse: IAPIResponse<ICharacter>) => ({
  type: SET_SEARCH_HEROES,
  heroesResponse,
});

export const setResetSearchAction = () => ({ type: SET_RESET_SEARCH });

export const setIsLoadingAction = (isLoading = true) => ({ type: SET_ISLOADING, isLoading });
export const setHasErrorOnLoadingAction = (hasError = true) => ({ type: SET_ISLOADING, hasError });
