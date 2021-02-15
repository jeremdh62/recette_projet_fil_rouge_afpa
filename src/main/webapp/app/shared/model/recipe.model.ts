import { Moment } from 'moment';
import { INote } from 'app/shared/model/note.model';
import { IComments } from 'app/shared/model/comments.model';
import { IIngredient } from 'app/shared/model/ingredient.model';
import { IUstensil } from 'app/shared/model/ustensil.model';
import { ICategory } from 'app/shared/model/category.model';
import { IEvent } from 'app/shared/model/event.model';
import { IUserInfo } from 'app/shared/model/user-info.model';

export interface IRecipe {
  id?: number;
  name?: string;
  description?: string;
  pictureContentType?: string;
  picture?: any;
  video?: string;
  difficulty?: number;
  price?: number;
  unrollRecipe?: any;
  nbPerson?: number;
  time?: number;
  season?: string;
  origin?: string;
  online?: boolean;
  cooking?: string;
  favorite?: boolean;
  createdAt?: string;
  updatedAt?: string;
  notes?: INote[];
  comments?: IComments[];
  ingredients?: IIngredient[];
  ustensils?: IUstensil[];
  categories?: ICategory[];
  events?: IEvent[];
  userinfo?: IUserInfo;
}

export const defaultValue: Readonly<IRecipe> = {
  online: false,
  favorite: false,
};
