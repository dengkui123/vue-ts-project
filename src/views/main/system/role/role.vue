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
    ></page-content>
  </div>
</template>

<script lang="ts">
// pageName!!!当前页面的类型（请求接口需用到的区分参数）
import { defineComponent } from 'vue';
// 搜索组件
import PageSearch from '@/components/page-search';
// 表格内容组件
import PageContent from '@/components/page-content';
// 搜索配置
import { searchFormConfig } from './config/search.config';
// 表格配置
import { contentTableConfig } from './config/content.config';
//hooks
import { usePageSearch } from '@/hooks/use-page-search';
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
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
