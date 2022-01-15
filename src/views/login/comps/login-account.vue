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
import { ElForm } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';
import { rules } from '../config/account-config';

export default defineComponent({
  setup() {
    const account = reactive({
      name: '',
      password: ''
    });

    const formRef = ref<InstanceType<typeof ElForm>>();
    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (!valid) return;
        console.log('进行登录');
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
  ::v-deep .el-form {
    .el-form-item {
      .el-form-item__label {
        line-height: 40px;
      }
    }
  }
}
</style>
