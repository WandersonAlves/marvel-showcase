import { IEditedHero } from "../../interfaces/ReduxInterface";
import { SET_EDIT_HERO, SET_BATCH_EDIT_HERO, SET_REMOVE_EDIT_HERO } from "./actionList";

export const setEditHeroAction = (editedHero: IEditedHero) => ({
  type: SET_EDIT_HERO,
  editedHero
});

export const setBatchEditHeroAction = (heroes: IEditedHero[]) => ({
  type: SET_BATCH_EDIT_HERO,
  heroes
});

export const setRemoveEditHeroAction = (heroID: number) => ({
  type: SET_REMOVE_EDIT_HERO,
  heroID
})