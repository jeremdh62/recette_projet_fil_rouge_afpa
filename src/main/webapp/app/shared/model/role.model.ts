import { IUserInfo } from 'app/shared/model/user-info.model';

export interface IRole {
  id?: number;
  role?: string;
  userInfos?: IUserInfo[];
}

export const defaultValue: Readonly<IRole> = {};
