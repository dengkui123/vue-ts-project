<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="30%"
    destroy-on-close
    center
  >
    <kk-form v-model="formData" v-bind="modalFormConfig"></kk-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
// 表单
import KkForm from '@/base-ui/form/src/index.vue';
import { ref, defineComponent, defineProps, defineExpose, watch } from 'vue';
import { useStore } from '@/store';
defineComponent({
  KkForm
});
const props = defineProps({
  modalFormConfig: {
    type: Object,
    required: true
  },
  initInfo: {
    type: Object,
    default: () => ({})
  },
  dialogTitle: {
    type: String,
    default: '新建'
  },
  pageName: {
    type: String,
    required: true
  }
});
// 对话框
const dialogVisible = ref(false);

const formData = ref<any>({});

watch(
  () => props.initInfo,
  (newValue) => {
    for (const item of props.modalFormConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`];
    }
  }
);
// 点击确定之后的逻辑
const store = useStore();

const handleConfirmClick = () => {
  if (Object.keys(props.initInfo).length) {
    // 编辑
    store.dispatch('system/editPageDataAction', {
      pageName: props.pageName,
      id: props.initInfo.id,
      editData: { ...formData.value }
    });
  } else {
    // 新建
    store.dispatch('system/addPageDataAction', {
      pageName: props.pageName,
      newData: { ...formData.value }
    });
  }
  dialogVisible.value = false;
};
defineExpose({
  dialogVisible
});
</script>
