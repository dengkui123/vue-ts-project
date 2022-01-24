<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleReset"
      @searchBtnClick="handleSearch"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
    ></page-content>
  </div>
</template>

<script lang="ts">
// user页面 -> page/search公共组件 -> table/form子组件

// pageName!!!当前页面的类型（请求接口需用到的区分参数）
import { defineComponent, ref } from 'vue';
// 搜索组件
import PageSearch from '@/components/page-search';
// 表格内容组件
import PageContent from '@/components/page-content';
// 搜索配置
import { searchFormConfig } from './config/search.config';
// 表格配置
import { contentTableConfig } from './config/table.config';
// hooks
import { usePageSearch } from '@/hooks/use-page-search';

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    // 此部分已移入hooks(set-page-search)
    // const pageContentRef = ref<InstanceType<typeof PageContent>>();
    // // 调用子组件（pageContent）的获取数据的方法
    // // 该方法在 <script setup> 语法糖下需要将子组件方法用 defineExpose 暴露出来
    // const handleReset = () => {
    //   pageContentRef.value.getPageData();
    // };
    // const handleSearch = (formData: any) => {
    //   pageContentRef.value.getPageData(formData);
    // };
    const [pageContentRef, handleReset, handleSearch] = usePageSearch();
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleReset,
      handleSearch
    };
  }
});
</script>

<style lang="less" scoped></style>
