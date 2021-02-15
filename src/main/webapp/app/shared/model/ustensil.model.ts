import { IRecipe } from 'app/shared/model/recipe.model';

export interface IUstensil {
  id?: number;
  ustensil?: string;
  recipes?: IRecipe[];
}

export const defaultValue: Readonly<IUstensil> = {};
