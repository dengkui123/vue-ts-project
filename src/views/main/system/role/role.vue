<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
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
import { contentTableConfig } from './config/table.config';

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    };
  }
});
</script>

<style lang="less" scoped></style>
