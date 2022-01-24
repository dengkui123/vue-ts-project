import { createStore, Store, useStore as useVuexStore } from 'vuex';

import login from './login/login';
import system from './main/system/system';

import { IRootState, IStoreType } from './types';

const store = createStore<IRootState>({
  state() {
    return {
      name: 'kk'
    };
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    system
  }
});
// 初始化vuex
export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}
// 使用module里方法
export function useStore(): Store<IStoreType> {
  return useVuexStore();
}
export default store;
