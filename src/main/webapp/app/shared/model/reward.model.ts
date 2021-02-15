import { IUserInfo } from 'app/shared/model/user-info.model';

export interface IReward {
  id?: number;
  reward?: string;
  userInfos?: IUserInfo[];
}

export const defaultValue: Readonly<IReward> = {};
