import { service } from '@/service';
import { IDataType, IUserList } from './types';

// 获取用户列表
export function getPageList(url: string, queryInfo: any) {
  return service.post<IDataType<IUserList>>({
    url: url,
    data: queryInfo
  });
}

// 删除页面数据
export function deletePageDataById(url: string) {
  return service.delete<IDataType>({
    url: url
  });
}

// 添加数据
export function addPageData(url: string, newData: any) {
  return service.post<IDataType>({
    url: url,
    data: newData
  });
}

// 编辑数据
export function editPageData(url: string, editData: any) {
  return service.patch<IDataType>({
    url: url,
    data: editData
  });
}
