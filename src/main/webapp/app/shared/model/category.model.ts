import { IRecipe } from 'app/shared/model/recipe.model';

export interface ICategory {
  id?: number;
  category?: string;
  recipes?: IRecipe[];
}

export const defaultValue: Readonly<ICategory> = {};
