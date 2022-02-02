<template>
  <!-- goods.vue -> page-content -> kk-table -> el-table -->
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleReset"
      @searchBtnClick="handleSearch"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      ref="pageContentRef"
    >
      <!-- 将这个插槽依次传入page-content、kk-table、el-table -->
      <template #image="scope">
        <el-image
          style="width: 80px; height: 100px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
      <template #oldPrice="scope">{{ '￥' + scope.row.oldPrice }}</template>
    </page-content>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content';
import PageSearch from '@/components/page-search';
import { contentTableConfig } from './config/content.config';
import { searchFormConfig } from './config/search.config';

import { usePageSearch } from '@/hooks/use-page-search';
const [pageContentRef, handleReset, handleSearch] = usePageSearch();
</script>

<style scoped></style>
