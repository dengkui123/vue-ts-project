import { createStore, Store, useStore as useVuexStore } from 'vuex';

import login from './login/login';
import system from './main/system/system';
import dashboard from './main/analysis/dashboard';

import { getPageList } from '@/api/main/system/system';

import { IRootState, IStoreType } from './types';

const store = createStore<IRootState>({
  state() {
    return {
      name: 'kk',
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    };
  },
  getters: {},
  mutations: {
    // 保存部门数据
    setEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    // 保存角色数据
    setEntireRole(state, list) {
      state.entireRole = list;
    },
    // 保存菜单数据
    setEntireMenu(state, list) {
      state.entireMenu = list;
    }
  },
  actions: {
    // 请求部门数据
    async getInitDataAction({ commit }) {
      const {
        data: { list: deptList }
      } = await getPageList('/department/list', {
        offset: 0,
        size: 1000
      });
      // 请求角色数据
      const {
        data: { list: roleList }
      } = await getPageList('/role/list', {
        offset: 0,
        size: 1000
      });
      // 请求菜单数据
      const {
        data: { list: menuList }
      } = await getPageList('/menu/list', {});
      // 保存部门数据
      commit('setEntireDepartment', deptList);
      // 保存角色数据
      commit('setEntireRole', roleList);
      // 保存菜单数据
      commit('setEntireMenu', menuList);
    }
  },
  modules: {
    login,
    system,
    dashboard
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
