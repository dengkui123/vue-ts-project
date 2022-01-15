<template>
  <div class="login-account">
    <el-form ref="ruleFormRef" :model="phone" :rules="rules" size="large">
      <el-form-item prop="phonenumber">
        <el-input
          v-model="phone.number"
          placeholder="手机号"
          prefix-icon="Iphone"
        ></el-input>
      </el-form-item>
      <el-form-item prop="verify-code">
        <div class="flex verify-code">
          <el-input
            type="password"
            v-model="phone.password"
            placeholder="验证码"
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yanzhengma"></use>
                </svg>
              </el-icon>
            </template>
          </el-input>
          <el-button type="primary" class="get-code">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { rules } from '../config/phone-config';

export default defineComponent({
  setup() {
    const phone = reactive({
      number: '',
      password: ''
    });
    return {
      phone,
      rules
    };
  }
});
</script>

<style lang="less" scoped>
.login-account {
  margin-top: 20px;
  ::v-deep .el-form {
    .el-form-item {
      .verify-code {
        width: 100%;
      }
      .get-code {
        margin-left: 20px;
      }
      .el-form-item__label {
        line-height: 40px;
      }
    }
  }
}
</style>
