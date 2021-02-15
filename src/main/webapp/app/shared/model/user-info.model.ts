import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { INote } from 'app/shared/model/note.model';
import { IRecipe } from 'app/shared/model/recipe.model';
import { IComments } from 'app/shared/model/comments.model';
import { IRole } from 'app/shared/model/role.model';
import { IReward } from 'app/shared/model/reward.model';

export interface IUserInfo {
  id?: number;
  newsletter?: boolean;
  createdAt?: string;
  updatedAt?: string;
  userName?: string;
  user?: IUser;
  notes?: INote[];
  recipes?: IRecipe[];
  comments?: IComments[];
  role?: IRole;
  reward?: IReward;
}

export const defaultValue: Readonly<IUserInfo> = {
  newsletter: false,
};
