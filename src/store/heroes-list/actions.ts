import { IAPIResponse } from '../../interfaces/CommonInterface';
import { ICharacter } from '../../interfaces/CharacterInterface';
import { SET_HEROES, SET_ISLOADING, SET_ADD_MORE_HEROES } from './actionList';

export const setHeroesAction = (heroesResponse: IAPIResponse<ICharacter>) => ({
  type: SET_HEROES,
  heroesResponse,
});

export const setAddMoreHeroesAction = (heroesResponse: IAPIResponse<ICharacter>) => ({
  type: SET_ADD_MORE_HEROES,
  heroesResponse,
});

export const setIsLoadingAction = (isLoading = true) => ({ type: SET_ISLOADING, isLoading });
export const setHasErrorOnLoadingAction = (hasError = true) => ({ type: SET_ISLOADING, hasError });
