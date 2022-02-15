import { IGoodsList } from '@/api/main/analysis/types';

export interface IDashBoardState {
  amountGoodsList: IGoodsList[];
  categoryGoodsCount: any[];
  categoryGoodsSale: any[];
  categoryGoodsFavor: any[];
  addressGoodsSale: any[];
}
