<template>
  <div class="login-account">
    <el-form ref="formRef" :model="account" :rules="rules" size="large">
      <el-form-item prop="name">
        <el-input v-model="account.name" placeholder="账号" prefix-icon="User">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="account.password"
          placeholder="密码"
          prefix-icon="Lock"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { ElForm } from 'element-plus';
import localCache from '@/utils/cache';

import { rules } from '../config/account-config';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    // 路由守卫 query: { redirect:  }
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    });

    const formRef = ref<InstanceType<typeof ElForm>>();
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (!valid) return;
        // 1.判断是否需要记住密码
        if (isKeepPassword) {
          // 本地缓存
          localCache.setCache('name', account.name);
          localCache.setCache('password', account.password);
        } else {
          localCache.deleteCache('name');
          localCache.deleteCache('password');
        }
        // 2.进行登陆
        store.dispatch('login/accountLoginAction', {
          ...account,
          ...route.query
        });
      });
    };

    return {
      account,
      rules,
      loginAction,
      formRef
    };
  }
});
</script>

<style lang="less" scoped>
.login-account {
  margin-top: 20px;
  :deep(.el-form) {
    .el-form-item {
      .el-form-item__label {
        line-height: 40px;
      }
    }
  }
}
</style>
