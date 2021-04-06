import { IIngredient } from 'app/shared/model/ingredient.model';
import { IRecipe } from 'app/shared/model/recipe.model';

export interface IQuantity {
  id?: number;
  qty?: number;
  unit?: string;
  ingredient?: IIngredient;
  recipe?: IRecipe;
}

export const defaultValue: Readonly<IQuantity> = {};
