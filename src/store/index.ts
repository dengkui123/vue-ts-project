import { createStore, Store, useStore as useVuexStore } from 'vuex';

import login from './login/login';
import system from './main/system/system';

import { getPageList } from '@/api/main/system/system';

import { IRootState, IStoreType } from './types';

const store = createStore<IRootState>({
  state() {
    return {
      name: 'kk',
      entireDepartment: [],
      entireRole: []
    };
  },
  getters: {},
  mutations: {
    setEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    setEntireRole(state, list) {
      state.entireRole = list;
    }
  },
  actions: {
    // 请求部门和角色数据
    async getInitDataAction({ commit }) {
      const {
        data: { list: deptList }
      } = await getPageList('/department/list', {
        offset: 0,
        size: 1000
      });
      // 保存部门数据
      commit('setEntireDepartment', deptList);

      const {
        data: { list: roleList }
      } = await getPageList('/role/list', {
        offset: 0,
        size: 1000
      });
      // 保存角色数据
      commit('setEntireRole', roleList);
    }
  },
  modules: {
    login,
    system
  }
});
// 初始化vuex
export function setupStore() {
  store.dispatch('login/loadLocalLogin');

  store.dispatch('getInitDataAction');
}
// 使用module里方法
export function useStore(): Store<IStoreType> {
  return useVuexStore();
}
export default store;
