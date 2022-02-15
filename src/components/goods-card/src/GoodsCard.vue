<template>
  <div class="goods-card">
    <div class="top">
      <div class="left">
        <div class="title">{{ goodsData.title }}</div>
        <div class="number1">{{ num1 }}</div>
      </div>
      <div class="icon"><Warning /></div>
    </div>
    <el-divider></el-divider>
    <div class="bottom">
      <span class="subtitle">{{ goodsData.subtitle }}</span>
      <span class="number2">{{ num2 }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, getCurrentInstance } from 'vue';
import { IGoodsList } from '@/api/main/analysis/types';
const props = defineProps<{
  goodsData: IGoodsList;
}>();
const internalInstance = getCurrentInstance();
const globalProperties = internalInstance?.appContext.config.globalProperties;

const format = (num: number) => {
  return computed(() => {
    if (props.goodsData.amount === 'saleroom') {
      return '￥' + globalProperties?.$number.formatNumber(num);
    }
    return globalProperties?.$number.formatNumber(num);
  });
};
const num1 = format(props.goodsData.number1);
const num2 = format(props.goodsData.number2);
</script>

<style lang="less" scoped>
.goods-card {
  font-size: 14px;
  padding: 20px;
  background-color: #fff;
  width: 100%;
  border-radius: 5px;
  height: 80px;
  .top {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .title {
        color: #999;
        height: 24px;
      }
      .number1 {
        font-size: 22px;
      }
    }
    .icon {
      color: #999;
    }
  }
  .el-divider {
    margin: 10px auto;
  }
  .bottom {
    text-align: left;
    .subtitle {
      margin-right: 5px;
    }
  }
}
</style>
