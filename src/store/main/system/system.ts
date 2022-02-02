import { Module } from 'vuex';
import router from '@/router';

import { IRootState } from '@/store/types';
import { ISystemState } from './types';

import {
  getPageList,
  deletePageDataById,
  addPageData,
  editPageData
} from '@/api/main/system/system';

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      searchParams: {},
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
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
    },
    searchParams: (state) => state.searchParams
  },
  mutations: {
    setSearchParams(state, params: any) {
      state.searchParams = params;
    },
    setUsersList(state, list: any[]) {
      state.usersList = list;
    },
    setUsersCount(state, count: number) {
      state.usersCount = count;
    },
    setRoleList(state, list: any[]) {
      state.roleList = list;
    },
    setRoleCount(state, count: number) {
      state.roleCount = count;
    },
    setGoodsList(state, list: any[]) {
      state.goodsList = list;
    },
    setGoodsCount(state, count: number) {
      state.goodsCount = count;
    },
    setMenuList(state, list: any[]) {
      state.menuList = list;
    },
    setMenuCount(state, count: number) {
      state.menuCount = count;
    }
  },
  actions: {
    // 异步请求数据
    async getPageListAction({ commit }, payload: any) {
      const { pageName, queryInfo } = payload;
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
      const pageResult = await getPageList(pageUrl, queryInfo);

      // 2. 数据保存到state
      const { list, totalCount = list.length } = pageResult.data;

      commit(
        `set${pageName.slice(0, 1).toUpperCase() + pageName.slice(1)}List`,
        list
      );
      commit(
        `set${pageName.slice(0, 1).toUpperCase() + pageName.slice(1)}Count`,
        totalCount
      );
    },
    // 保存查询条件
    async setSearchParamsAction({ state, commit }, payload: any) {
      commit('setSearchParams', { ...payload });
    },

    // 删除数据
    async deletePageDataAction({ state, dispatch }, payload: any) {
      // 1.pageName -> /users
      // 2.id -> /users/id
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await deletePageDataById(pageUrl);
      // 获取最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: state.searchParams
      });
    },

    // 添加数据
    async addPageDataAction({ state, dispatch }, payload: any) {
      // 1. 创建数据请求
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;

      await addPageData(pageUrl, newData);
      // 2. 请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: state.searchParams
      });
    },

    // 编辑数据
    async editPageDataAction({ state, dispatch }, payload: any) {
      // 1. 创建数据请求
      const { pageName, id, editData } = payload;
      const pageUrl = `/${pageName}/${id}`;

      await editPageData(pageUrl, editData);
      // 2. 请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: state.searchParams
      });
    }
  }
};

export default systemModule;
