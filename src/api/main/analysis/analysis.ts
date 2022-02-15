import { service } from '@/service';
import { IDataType, IGoodsList } from './types';

enum DashboardAPI {
  amountGoodsList = '/goods/amount/list',
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

// 获取用户列表
export function getAmoutGoodsList() {
  return service.get<IDataType<IGoodsList>>({
    url: DashboardAPI.amountGoodsList
  });
}

// 获取商品数目
export function getCategoryGoodsCount() {
  return service.get<IDataType<IGoodsList>>({
    url: DashboardAPI.categoryGoodsCount
  });
}

export function getCategoryGoodsSale() {
  return service.get<IDataType<IGoodsList>>({
    url: DashboardAPI.categoryGoodsSale
  });
}

export function getCategoryGoodsFavor() {
  return service.get<IDataType<IGoodsList>>({
    url: DashboardAPI.categoryGoodsFavor
  });
}
export function getAddressGoodsSale() {
  return service.get<IDataType<IGoodsList>>({
    url: DashboardAPI.addressGoodsSale
  });
}
