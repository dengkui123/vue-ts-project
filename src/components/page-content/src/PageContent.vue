<template>
  <!-- 表格部分所有内容 -->
  <div class="page-content">
    <kk-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      @updatePage="updatePage"
    >
      <!-- header插槽 -->
      <template #headerHandler>
        <el-button type="primary" icon="Plus">新建</el-button>
        <el-button type="primary" plain icon="Refresh"></el-button>
      </template>
      <!-- 具名作用域插槽 -->
      <!-- 具名插槽插入内容status，作用于插槽获取子组件内的row -->
      <template v-slot:status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template v-slot:createAt="scope">
        <span>{{ $dayjs.formatLocalTime(scope.row.createAt) }}</span>
      </template>
      <template v-slot:updateAt="scope">
        <span>{{ $dayjs.formatLocalTime(scope.row.createAt) }}</span>
      </template>
      <template v-slot:handler>
        <div class="handle-btns">
          <el-button type="text" size="small" icon="Edit">编辑</el-button>
          <el-button type="text" size="small" icon="Delete">删除</el-button>
        </div>
      </template>
    </kk-table>
  </div>
</template>

<script setup lang="ts">
import KkTable from '@/base-ui/table';

import { computed, ref, watch, defineProps, defineExpose } from 'vue';
import { useStore } from '@/store';

const props = defineProps({
  contentTableConfig: {
    type: Object,
    requreid: true
  },
  pageName: {
    type: String,
    requreid: true
  }
});

const store = useStore();
const pageInfo = ref({ currentPage: 1, pageSize: 10 });

const updatePage = (pageProp: any) => {
  pageInfo.value.currentPage = pageProp.currentPage;
  pageInfo.value.pageSize = pageProp.pageSize;

  getPageData();
};
// pageName!!!!!!
// 请求数据可以写在当前位置，也可以写在对应的功能页面（上级），当前页面有利于封装，上级更直观，但需要写多次接口代码
// 接口规范可以用该方式（传入pageName属性区分拼接url）,倘若不规范需要在vuex发送请求时进行判断给url分别赋值或者用map映射  pageName -> url

// 取舍： 数据请求 写在pageContent 需要考虑在搜索组件重新请求数据问题（通过父组件来过度）
const getPageData = (queryData: any = {}) => {
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryData
    }
  });
};
// 初始化获取数据
getPageData();
// 通过 state
// const userList = computed(() => store.state.system[`${props.pageName}List`]);
// const userCount = computed(() => store.state.system[`${props.pageName}Count`]);

// 通过 getter
const dataList = computed(() =>
  store.getters[`system/pageListData`](props.pageName)
);

const dataCount = computed(() =>
  store.getters[`system/pageListCount`](props.pageName)
);

// 表格多选框
// const selectionChange = (value: any) => {
//   console.log(value);
// };

defineExpose({
  getPageData
});
</script>

<style lang="less" scoped></style>
