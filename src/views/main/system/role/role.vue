<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleReset"
      @searchBtnClick="handleSearch"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      ref="pageContentRef"
      @add-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    >
      <template #headerBtn> 新建角色 </template>
    </page-content>

    <page-modal
      :modalFormConfig="modalConfig"
      pageName="role"
      ref="pageModelRef"
      :initInfo="initInfo"
      :otherInfo="otherInfo"
      :dialogTitle="dialogTitle"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :check-strictly="true"
          :props="{
            children: 'children',
            label: 'name',
            disabled: 'disabled'
          }"
          @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts" setup>
// pageName!!!当前页面的类型（请求接口需用到的区分参数）
import { defineComponent, ref, watch, computed, nextTick } from 'vue';
import { useStore } from '@/store';

import { getMenuLeafKeys } from '@/utils/map-menus';
// 搜索组件
import PageSearch from '@/components/page-search';
// 表格内容组件
import PageContent from '@/components/page-content';
// 表单组件
import PageModal from '@/components/page-modal';
// 搜索配置
import { searchFormConfig } from './config/search.config';
// 表格配置
import { contentTableConfig } from './config/content.config';
// hooks
import { usePageSearch } from '@/hooks/use-page-search';
import { usePageModal } from '@/hooks/use-page-modal';

// 表单配置
import { modalConfig } from './config/modal.config';
import { ElTree } from 'element-plus';

defineComponent({
  PageSearch,
  PageContent,
  PageModal
});
const [pageContentRef, handleReset, handleSearch] = usePageSearch();

// 处理树形控件菜单的回显
const elTreeRef = ref<InstanceType<typeof ElTree>>();
const editCallBack = (item: any) => {
  const leafKeys = getMenuLeafKeys(item.menuList);
  console.log(item);

  nextTick(() => {
    console.log(elTreeRef.value);
    elTreeRef.value?.setCheckedKeys(leafKeys, false);
  });
};

// 表单hooks(表单ref、表单初始值、新建、编辑、对话框标题编号)
const [
  pageModelRef,
  initInfo,
  handleNewData,
  handleEditData,
  dialogTitleIndex
] = usePageModal(undefined, editCallBack);

// 修改对话框标题
const dialogTitle = ref('');
watch(
  () => dialogTitleIndex.value,
  (newValue) => {
    dialogTitle.value = newValue === 1 ? '新建角色' : '编辑角色';
  }
);

// 树形控件
const store = useStore();
const menus = computed(() => store.state.entireMenu);

const otherInfo = ref({});
const handleCheckChange = (data: any, key: any) => {
  const menuListKeys = [...key.checkedKeys, ...key.halfCheckedKeys];
  otherInfo.value = { menuListKeys };
};
</script>

<style lang="less" scoped>
.menu-tree {
  margin-left: 10px;
}
</style>
