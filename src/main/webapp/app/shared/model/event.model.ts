import { IRecipe } from 'app/shared/model/recipe.model';

export interface IEvent {
  id?: number;
  event?: string;
  recipes?: IRecipe[];
}

export const defaultValue: Readonly<IEvent> = {};
