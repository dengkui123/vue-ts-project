import { service } from '@/service';
import { IDataType, IUserList } from './types';

// 获取用户列表
export function getPageListAction(url: string, queryInfo: any) {
  return service.post<IDataType<IUserList>>({
    url: url,
    data: queryInfo
  });
}
