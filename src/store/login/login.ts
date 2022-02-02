import { Module } from 'vuex';
import router from '@/router';
import {
  accountLogin,
  getUserInfoById,
  getUserMenuByRoleId
} from '@/api/login';
import localCache from '@/utils/cache';
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus';
// import { IAccount } from '@/api/login/type';
import { IRootState } from '../types';
import { ILoginState } from './types';

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: {},
      permissions: []
    };
  },
  getters: {},
  mutations: {
    setToken(state, token: string) {
      state.token = token;
    },
    setUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    setUserMenu(state, userMenu: any) {
      state.userMenu = userMenu;

      // userMenu => routes
      const routes = mapMenusToRoutes(userMenu);
      // 将routes => router.home.children
      console.log(routes);
      routes.forEach((route) => {
        router.addRoute('Main', route);
      });

      // 获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenu);
      state.permissions = permissions;
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload) {
      // 1.实现登录逻辑
      const account = { name: payload.name, password: payload.password };
      const loginResult = await accountLogin(account);
      const { id, token } = loginResult.data;
      commit('setToken', token);
      localCache.setCache('token', token);

      // 2. 请求用户信息
      const userInfoResult = await getUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit('setUserInfo', userInfo);
      localCache.setCache('userInfo', userInfo);

      // 3. 获取用户菜单
      const { data: userMenu } = await getUserMenuByRoleId(userInfo.role.id);
      console.log(userMenu);

      commit('setUserMenu', userMenu);
      localCache.setCache('userMenu', userMenu);
      // 4. 跳转页面
      router.push({
        path: payload.redirect ?? '/'
      });
    },
    // vuex初始化信息
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token');
      if (token) {
        commit('setToken', token);
      }
      const userInfo = localCache.getCache('userInfo');
      if (userInfo) {
        commit('setUserInfo', userInfo);
      }
      const userMenu = localCache.getCache('userMenu');
      if (userMenu) {
        commit('setUserMenu', userMenu);
      }
    }
  }
};

export default loginModule;
