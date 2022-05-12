<template>
  <!-- 表格部分所有内容 -->
  <div class="page-content">
    <kk-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      @updatePage="updatePage"
      :pageInfo="pageInfo"
    >
      <!-- header插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          icon="Plus"
          @click="handleNewClick"
        >
          <slot name="headerBtn">新建</slot>
        </el-button>
        <el-button type="primary" plain icon="Refresh"></el-button>
      </template>

      <!-- 具名作用域插槽 （表格列中）-->
      <!-- 具名插槽插入内容status，作用于插槽获取子组件内的row -->
      <!-- 通用插槽 -->
      <template v-slot:status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template v-slot:createAt="scope">
        <span>{{ $dayjs.formatTimestamp(scope.row.createAt) }}</span>
      </template>
      <template v-slot:updateAt="scope">
        <span>{{ $dayjs.formatLocalTime(scope.row.createAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            type="text"
            size="small"
            icon="Edit"
            @click="handleEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="isDelete"
            type="text"
            size="small"
            icon="Delete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 独立插槽 -->
      <!-- scope传递方向 el-table -> kk-table -> pageContent -> goods -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <!-- 判断是否有插槽（通过slotName） -->
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </kk-table>
  </div>
</template>

<script setup lang="ts">
import KkTable from '@/base-ui/table';

import { computed, ref, defineProps, defineEmits, defineExpose } from 'vue';
import { useStore } from '@/store';
import { usePermission } from '@/hooks/use-permission';

const props = defineProps({
  contentTableConfig: {
    type: Object,
    requreid: true
  },
  pageName: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['addBtnClick', 'editBtnClick']);

const store = useStore();

// 0. 获取操作权限(待优化 用自定义指令实现)
const isCreate = usePermission(props.pageName, 'create');
const isUpdate = usePermission(props.pageName, 'update');
const isDelete = usePermission(props.pageName, 'delete');
const isQuery = usePermission(props.pageName, 'query');

// 1. 分页查询参数
const pageInfo = ref({ currentPage: 1, pageSize: 10 });

// 1-0.初次获取数据
store.dispatch('system/getPageListAction', {
  pageName: props.pageName,
  queryInfo: {
    offset: 0,
    size: 10
  }
});

// 1-1.通过getter获取搜索查询参数
const searchParams = computed(() => store.getters['system/searchParams']);

// 1-2.分页查询数据方法
const updatePage = (pageProp: any) => {
  // 修改分页参数(页面显示)
  pageInfo.value.currentPage = pageProp.currentPage;
  pageInfo.value.pageSize = pageProp.pageSize;
  // 保存分页修改信息
  searchParams.value.offset = (pageProp.currentPage - 1) * pageProp.pageSize;
  searchParams.value.size = pageProp.pageSize;
  getPageData(searchParams.value);
};

// 2. 发送网络请求
// pageName!!!!!!
// 请求数据可以写在当前位置，也可以写在对应的功能页面（上级），当前页面有利于封装，上级更直观，但需要写多次接口代码
// 接口规范可以用该方式（传入pageName属性区分拼接url）,倘若不规范需要在vuex发送请求时进行判断给url分别赋值或者用map映射  pageName -> url

// 1-3. 取舍： 数据请求 写在pageContent 需要考虑在搜索组件重新请求数据问题（通过父组件来过度）
const getPageData = (query: any = {}) => {
  if (!isQuery) return;
  // 重置currentPage（页面显示）
  if (query.offset === 0) {
    pageInfo.value.currentPage = 1;
  }
  // 更新查询参数
  store.dispatch('system/setSearchParamsAction', {
    offset: searchParams.value.offset,
    size: searchParams.value.size,
    ...query
  });
  // 发送请求
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    queryInfo: searchParams.value
  });
};

// 3. 从vuex获取初始数据

// 通过 state
// const userList = computed(() => store.state.system[`${props.pageName}List`]);
// const userCount = computed(() => store.state.system[`${props.pageName}Count`]);

// 通过 getter 获取 表格数据
const dataList = computed(() =>
  store.getters[`system/pageListData`](props.pageName)
);

const dataCount = computed(() =>
  store.getters[`system/pageListCount`](props.pageName)
);

// 4.获取其他的动态插槽名称
const otherPropSlots = props.contentTableConfig?.propList.filter(
  (item: any) => {
    // 过滤掉公共插槽
    if (
      item.slotName === 'status' ||
      item.slotName === 'createAt' ||
      item.slotName === 'updateAt' ||
      item.slotName === 'handler'
    ) {
      return false;
    }
    return true;
  }
);

// 5. 删除/编辑/新建操作
// 5.1 删除
const handleDeleteClick = (item: any) => {
  store.dispatch('system/deletePageDataAction', {
    pageName: props.pageName,
    id: item.id
  });
};

// 5.2 新建
const handleNewClick = () => {
  emits('addBtnClick');
};
// 5.3 编辑
const handleEditClick = (item: any) => {
  emits('editBtnClick', item);
};
defineExpose({
  getPageData
});
</script>

<style lang="less" scoped></style>
