import { IUser } from 'app/shared/model/user.model';
import { INote } from 'app/shared/model/note.model';
import { IRecipe } from 'app/shared/model/recipe.model';
import { IComments } from 'app/shared/model/comments.model';
import { IReward } from 'app/shared/model/reward.model';

export interface IUserInfo {
  id?: number;
  newsletter?: boolean;
  user?: IUser;
  notes?: INote[];
  recipes?: IRecipe[];
  comments?: IComments[];
  reward?: IReward;
}

export const defaultValue: Readonly<IUserInfo> = {
  newsletter: false,
};
