<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-show="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      background-color="#0c2135"
      :collapse="collapse"
      text-color="#b7bdc3"
      active-text-color="white"
    >
      <template v-for="item in userMenu" :key="item.id">
        <!-- 存在二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 一级菜单 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <kk-icon :name="item.icon.slice(7)"></kk-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <!-- 二级菜单 -->
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleMenuItemClick(subItem)"
              >
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 只有一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <kk-icon :name="item.icon.slice(7)"></kk-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from '@/store';
import { useRouter, useRoute } from 'vue-router';
import { IMenuItem } from '../types';
import { pathMapToMenu } from '@/utils/map-menus';

import KkIcon from '@/base-ui/icon/index.vue';
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  components: {
    KkIcon
  },
  setup() {
    // store
    const store = useStore();
    const userMenu = computed(() => store.state.login.userMenu);
    // router
    const router = useRouter();
    const route = useRoute();
    const currentPath = route.path;
    // data
    const menu = pathMapToMenu(userMenu.value, currentPath);

    const defaultValue = ref(menu.id + '');
    // event handle
    const handleMenuItemClick = (item: IMenuItem) => {
      router.push({
        path: item.url ?? '/not-found'
      });
    };
    return {
      userMenu,
      defaultValue,
      handleMenuItemClick
    };
  }
});
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }
  // 目录
  .el-sub-menu {
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }
  :deep(.el-sub-menu__title) {
    background-color: #001529 !important;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
