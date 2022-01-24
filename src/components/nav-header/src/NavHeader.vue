<template>
  <div class="nav-header flex">
    <el-icon size="20" @click="handleFoldChange"><Operation /></el-icon>
    <kk-breadcrumb :breadcrumbs="breadcrumbs"></kk-breadcrumb>
    <user-Info></user-Info>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import UserInfo from './UserInfo.vue';
import KkBreadcrumb from '@/base-ui/breadcrumb';

import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import { pathMapBreadcrumbs } from '@/utils/map-menus';

export default defineComponent({
  emits: ['foldChange'],
  components: {
    UserInfo,
    KkBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldChange = () => {
      isFold.value = !isFold.value;
      emit('foldChange', isFold.value);
    };
    const store = useStore();
    const route = useRoute();
    const breadcrumbs = computed(() => {
      const userMenu = store.state.login.userMenu;
      const currentPath = route.path;
      return pathMapBreadcrumbs(userMenu, currentPath);
    });
    return {
      handleFoldChange,
      breadcrumbs
    };
  }
});
</script>

<style lang="less" scoped>
.nav-header {
  width: 100%;
  .el-icon {
    padding: 10px 10px 10px 0;
    cursor: pointer;
  }
}
</style>
