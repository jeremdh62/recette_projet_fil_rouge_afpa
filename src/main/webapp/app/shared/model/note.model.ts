import { IRecipe } from 'app/shared/model/recipe.model';
import { IUserInfo } from 'app/shared/model/user-info.model';

export interface INote {
  id?: number;
  note?: number;
  recipe?: IRecipe;
  userinfo?: IUserInfo;
}

export const defaultValue: Readonly<INote> = {};
