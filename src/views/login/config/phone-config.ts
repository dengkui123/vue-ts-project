import { reactive } from 'vue';

export const rules = reactive({
  phonenumber: [
    {
      required: true,
      message: '手机号不能为空',
      trigger: 'blur'
    }
  ],
  ['verify-code']: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur'
    }
  ]
});
