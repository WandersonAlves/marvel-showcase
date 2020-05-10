import { IEditedHero } from "../../interfaces/ReduxInterface";
import { SET_EDIT_HERO } from "./actionList";

export const setEditHeroAction = (editedHero: IEditedHero) => ({
  type: SET_EDIT_HERO,
  editedHero
});