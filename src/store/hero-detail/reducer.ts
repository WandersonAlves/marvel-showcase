import { IEditedHeroesListState, IReduxAction } from "../../interfaces/ReduxInterface";
import { SET_EDIT_HERO, SET_BATCH_EDIT_HERO, SET_REMOVE_EDIT_HERO, SET_LOAD_MORE_SERIES } from "./actionList";

const initialState: IEditedHeroesListState = {
  heroes: [],
  timesLoadedMore: 0
};

const editedHeroesReducer = (state = initialState, action: IReduxAction) => {
  switch (action.type) {
    case SET_EDIT_HERO: {
      const newOrEditHero = action.editedHero;
      const newHeroes = state.heroes.filter(h => h.id !== newOrEditHero.id);
      const returnState = {
        ...state,
        heroes: [...newHeroes, newOrEditHero]
      };
      localStorage.setItem('edited-heroes', JSON.stringify(returnState));
      return returnState;
    }
    case SET_REMOVE_EDIT_HERO: {
      const newHeroes = state.heroes.filter(h => h.id !== action.heroID);
      return {
        ...state,
        heroes: newHeroes
      }
    }
    case SET_LOAD_MORE_SERIES: {
      return {
        ...state,
        timesLoadedMore: state.timesLoadedMore + 1
      }
    }
    case SET_BATCH_EDIT_HERO: {
      return {
        ...state,
        heroes: action.heroes
      }
    }
    default: {
      return state;
    }
  }
};

export default editedHeroesReducer
