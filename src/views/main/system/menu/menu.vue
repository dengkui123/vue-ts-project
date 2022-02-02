<template>
  <div class="menu">
    <page-content :contentTableConfig="contentTableConfig" pageName="menu">
      <template #icon="scope">
        <template v-if="scope.row.icon"
          ><kk-icon :name="scope.row.icon?.slice(8)"></kk-icon
        ></template>
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content';
import KkIcon from '@/base-ui/icon/index.vue';
import { contentTableConfig } from './config/content.config';
</script>

<style scoped></style>
