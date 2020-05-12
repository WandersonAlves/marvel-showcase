import { IEditedHero } from "../../interfaces/ReduxInterface";
import { SET_EDIT_HERO, SET_BATCH_EDIT_HERO, SET_REMOVE_EDIT_HERO } from "./actionList";

export const editHeroAction = (editedHero: IEditedHero) => ({
  type: SET_EDIT_HERO,
  editedHero
});

export const batchEditHeroAction = (heroes: IEditedHero[]) => ({
  type: SET_BATCH_EDIT_HERO,
  heroes
});

export const removeEditHeroAction = (heroID: number) => ({
  type: SET_REMOVE_EDIT_HERO,
  heroID
});