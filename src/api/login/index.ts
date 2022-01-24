import { service } from '@/service';
import { IAccount, IDataType, ILoginResult } from './type';

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenu = '/role/' // role/1/menu
}

// 登录接口
export function accountLogin(account: IAccount) {
  return service.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}

export function getUserInfoById(id: number) {
  return service.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  });
}

export function getUserMenuByRoleId(id: number) {
  return service.get<IDataType>({
    url: `${LoginAPI.UserMenu}${id}/menu`
  });
}
