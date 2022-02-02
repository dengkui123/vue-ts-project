<template>
  <div class="kk-form" :style="formStyle">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth" :inline="true" size="default">
      <el-row :gutter="40">
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <!-- input || password -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <!-- select -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.title"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <!-- datepicker -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btn">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { IFormItem } from '../types';

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    //表单类型
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    // label宽度
    labelWidth: {
      type: String,
      default: '80px'
    },
    // 表单组件样式
    formStyle: {
      type: Object,
      default: () => ({ padding: '20px' })
    },
    // 单个表单样式
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 0', width: '100%' })
    },
    // 响应式布局
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 12,
        xs: 24
      })
    }
  },
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue });
    // 因为双向绑定的值为对象的属性，所以无法通过
    // :value="modelValue"   @input="$emit('update:modelValue', $event.target.value)"
    // 或者 计算属性的set方法来直接修改（set无法监听对象属性值的改变）
    // 因此考虑用watch深度监听来对触发事件
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue);
      },
      {
        deep: true
      }
    );
    // 该方法为父组件通过 ref 调用
    const handleSonReset = (data: any) => {
      formData.value = data;
    };
    return {
      formData,
      handleSonReset
    };
  }
});
</script>

<style lang="less" scoped>
.header {
  color: red;
}
.btn {
  text-align: right;
  // margin: 0 20px 20px 0;
}
</style>
