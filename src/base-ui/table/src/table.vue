<template>
  <div class="kk-table">
    <div class="header">
      <!-- header插槽 -->
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      header-align="center"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <!-- 主体部分 -->
      <template v-for="propItem in (propList as any)" :key="propItem.prop">
        <el-table-column align="center" show-overflow-tooltip v-bind="propItem">
          <!-- 该区域普通文本内容不传 -->
          <!-- 饿了么的作用域插槽 -->
          <template #default="scope">
            <!-- 具名作用域插槽 -->
            <!-- 用具名插槽代替默认内容, 作用域插槽向父组件传入row -->
            <slot :name="propItem.slotName" :row="scope.row">
              <!-- 当插槽激活时，下面的默认内容会被替换 -->
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          v-if="showPagination"
          v-model:currentPage="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  //表格数据列表
  listData: {
    type: Array,
    required: true
  },
  // 数据条数
  listCount: {
    type: Number,
    default: 0
  },
  pageInfo: {
    type: Object,
    default: () => ({ currentPage: 1, pageSize: 10 })
  },
  // 以下为配置文件props
  //表格标题
  title: {
    type: String,
    default: ''
  },
  // 表格每行的属性列表
  propList: {
    type: Array
  },
  //是否展示序号列
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  //是否展示选择列
  showSelectColumn: {
    type: Boolean,
    default: false
  },
  childrenProps: {
    type: Object,
    default: () => ({})
  },
  showPagination: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(['updatePage']);

const currentPage = ref(props.pageInfo.currentPage);
const pageSize = ref(props.pageInfo.pageSize);

watch(props.pageInfo, () => {
  currentPage.value = props.pageInfo.currentPage;
  pageSize.value = props.pageInfo.pageSize;
});
const handleSelectionChange = (value: any) => {
  console.log(123);
};
const handleCurrentChange = (value: any) => {
  // currentPage已双向绑定，无需赋值
  emit('updatePage', {
    currentPage: currentPage.value,
    pageSize: pageSize.value
  });
};
const handleSizeChange = (value: any) => {
  pageSize.value = value;
  currentPage.value = 1;
  emit('updatePage', {
    currentPage: 1,
    pageSize: pageSize.value
  });
};
</script>

<style lang="less" scoped>
.kk-table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  .header {
    display: flex;
    height: 45px;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
    .handler {
      display: flex;
      align-items: center;
    }
  }
  .footer {
    margin-top: 20px;
  }
}
</style>
