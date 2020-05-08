import { GetCharactersFactory } from '../../factories/CharacterFactory';
import { IHeroesListState, IReduxAction } from '../../interfaces/ReduxInterface';
import { SET_HEROES, SET_ISLOADING, SET_HASERRORONLOADING, SET_ADD_MORE_HEROES } from './actionList';

const initialState: IHeroesListState = {
  heroes: [],
  isLoading: false,
  hasErrorOnLoading: false,
};

const heroesReducer = (state = initialState, action: IReduxAction) => {
  switch (action.type) {
    case SET_HEROES: {
      const formattedHeroes = GetCharactersFactory(action.heroesResponse);
      return {
        ...state,
        heroes: formattedHeroes,
      };
    }
    case SET_ADD_MORE_HEROES: {
      const formattedHeroes = GetCharactersFactory(action.heroesResponse);
      const currentHeroes = [...state.heroes];
      currentHeroes.push(...formattedHeroes);
      return {
        ...state,
        heroes: currentHeroes,
      };
    }
    case SET_ISLOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_HASERRORONLOADING: {
      return {
        ...state,
        hasErrorOnLoading: action.hasError,
      };
    }
    default: {
      return state;
    }
  }
};

export default heroesReducer;
