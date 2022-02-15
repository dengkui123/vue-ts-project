<template>
  <el-dropdown trigger="click" size="large">
    <span class="el-dropdown-link flex">
      <el-avatar size="default" :src="circleUrl"></el-avatar>
      <span> {{ name }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="User">用户信息</el-dropdown-item>
        <el-dropdown-item icon="Setting">系统管理</el-dropdown-item>
        <el-dropdown-item icon="SwitchButton" divided @click="logout"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import localCache from '@/utils/cache';
export default defineComponent({
  setup() {
    const store = useStore();
    const state = reactive({
      circleUrl:
        'https://img2.baidu.com/it/u=2090606195,1473750087&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    });
    const name = computed(() => store.state.login.userInfo.name);
    const router = useRouter();
    const logout = () => {
      localCache.deleteCache('token');
      router.push('/main');
    };
    return {
      name,
      ...state,
      logout
    };
  }
});
</script>

<style lang="less" scoped>
.el-dropdown {
  padding: 10px;
  margin-right: 20px;
  .el-dropdown-link {
    cursor: pointer;
    span {
      margin-left: 5px;
    }
  }
}
</style>
