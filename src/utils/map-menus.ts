import { IBreadcrumb } from '@/base-ui/breadcrumb';
import { IMenuItem } from '@/components/nav-menu/types';
import { RouteRecordRaw } from 'vue-router';

let firstMenu: IMenuItem;

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = [];
  // webpack 依赖管理https://webpack.docschina.org/guides/dependency-management/#require-with-expression
  // 获取上下文文件
  const routeFiles = require.context('../router/main', true, /\.ts$/);
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1]);
    allRoutes.push(route.default);
  });
  // console.log(allRoutes);
  // 2.根据菜单获取需要添加的routes
  // type === 1表示为目录 递归调用 children -> type
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) routes.push(route);
        if (!firstMenu) {
          firstMenu = menu;
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };
  _recurseGetRoute(userMenus);

  return routes;
}
// 导出路径对应菜单树
export function pathMapBreadcrumbs(
  userMenus: IMenuItem[],
  currentPath: string
): IBreadcrumb[] {
  const breadcrumbs: IBreadcrumb[] = [];
  pathMapToMenu(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
}

// 导出路径对应菜单
export function pathMapToMenu(
  userMenu: IMenuItem[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenu) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name });
        breadcrumbs?.push({ name: findMenu.name });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

export { firstMenu };
