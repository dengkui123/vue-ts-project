import { Module } from 'vuex';

import { IRootState } from '@/store/types';
import { IDashBoardState } from './types';
import { IGoodsList } from '@/api/main/analysis/types';
import {
  getAmoutGoodsList,
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/api/main/analysis/analysis';

const DashboardModule: Module<IDashBoardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      amountGoodsList: [],
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    };
  },
  getters: {},
  mutations: {
    setAmountGoodsResult(state, list) {
      state.amountGoodsList = list;
    },
    setCategoryGoodsCountResult(state, list) {
      state.categoryGoodsCount = list;
    },
    setCategoryGoodsSaleResult(state, list) {
      state.categoryGoodsSale = list;
    },
    setCategoryGoodsFavorResult(state, list) {
      state.categoryGoodsFavor = list;
    },
    setAddressGoodsSaleResult(state, list) {
      state.addressGoodsSale = list;
    }
  },
  actions: {
    // 依次提交 action
    async getDashBoadrDataAction({ commit }) {
      // 请求数据
      const { data: amountGoodsResult } = await getAmoutGoodsList();
      // 提交到mutations
      commit('setAmountGoodsResult', amountGoodsResult);

      // 请求数据
      const { data: categoryGoodsCount } = await getCategoryGoodsCount();
      // 提交到mutations
      commit('setCategoryGoodsCountResult', categoryGoodsCount);

      // 请求数据
      const { data: categoryGoodsSale } = await getCategoryGoodsSale();
      // 提交到mutations
      commit('setCategoryGoodsSaleResult', categoryGoodsSale);

      // 请求数据
      const { data: categoryGoodsFavor } = await getCategoryGoodsFavor();
      // 提交到mutations
      commit('setCategoryGoodsFavorResult', categoryGoodsFavor);

      // 请求数据
      const { data: addressGoodsSale } = await getAddressGoodsSale();
      // 提交到mutations
      commit('setAddressGoodsSaleResult', addressGoodsSale);
    }
  }
};

export default DashboardModule;
