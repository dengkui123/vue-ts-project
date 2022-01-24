import { Module } from 'vuex';
import router from '@/router';

import { IRootState } from '@/store/types';
import { ISystemState } from './types';

import { getPageListAction } from '@/api/main/system/system';
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    };
  },
  getters: {
    pageListData: (state) => (pageName: string) => {
      // switch (pageName) {
      //   case 'users':
      //     return state.usersList;
      //   case 'role':
      //     return state.roleList;
      // }
      return (state as any)[`${pageName}List`] ?? [];
    },
    pageListCount: (state) => (pageName: string) => {
      return (state as any)[`${pageName}Count`] ?? [];
    }
  },
  mutations: {
    setUsersList(state, usersList: any[]) {
      state.usersList = usersList;
    },
    setUsersCount(state, usersCount: number) {
      state.usersCount = usersCount;
    },
    setRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    setRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    }
  },
  actions: {
    // 异步请求数据
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;

      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list';
      //     break;
      //   case 'role':
      //     pageUrl = '/role/list';
      //     break;
      // }

      // 1. 页面发送请求
      const pageResult = await getPageListAction(pageUrl, payload.queryInfo);

      // 2. 数据保存到state
      const { list, totalCount } = pageResult.data;
      commit(
        `set${pageName.slice(0, 1).toUpperCase() + pageName.slice(1)}List`,
        list
      );
      commit(
        `set${pageName.slice(0, 1).toUpperCase() + pageName.slice(1)}Count`,
        totalCount
      );
    }
  }
};

export default systemModule;
