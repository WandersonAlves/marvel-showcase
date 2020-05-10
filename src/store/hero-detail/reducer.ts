import { IEditedHeroesListState, IReduxAction } from "../../interfaces/ReduxInterface";
import { SET_EDIT_HERO } from "./actionList";

const initialState: IEditedHeroesListState = {
  heroes: []
};

const editedHeroesReducer = (state = initialState, action: IReduxAction) => {
  switch (action.type) {
    case SET_EDIT_HERO: {
      const newOrEditHero = action.editedHero;
      const newHeroes = state.heroes.filter(h => h.id !== newOrEditHero.id);
      return {
        ...state,
        heroes: [...newHeroes, newOrEditHero]
      }
    }
    default: {
      return state;
    }
  }
};

export default editedHeroesReducer
