import { IUserInfo } from 'app/shared/model/user-info.model';
import { IRecipe } from 'app/shared/model/recipe.model';

export interface IComments {
  id?: number;
  comments?: any;
  userinfo?: IUserInfo;
  recipe?: IRecipe;
}

export const defaultValue: Readonly<IComments> = {};
