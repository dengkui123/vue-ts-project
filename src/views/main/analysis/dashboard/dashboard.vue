<template>
  <div class="dashboard">
    <div class="counts">
      <goods-card
        v-for="item in amountGoodsList"
        :key="item.amount"
        :goods-data="item"
      ></goods-card>
    </div>
    <div class="charts">
      <el-row :gutter="10">
        <el-col :span="12">
          <card title="分类商品数量(饼图)">
            <pie-echart :pie-data="categoryGoodsCount"></pie-echart>
          </card>
        </el-col>
        <el-col :span="12">
          <card title="分类商品数量(玫瑰图)">
            <rose-echart :pie-data="categoryGoodsCount2"> </rose-echart>
          </card>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="content-row">
        <el-col :span="12">
          <card title="分类商品的销量" style="margin-bottom: 20px">
            <line-echart
              :x-labels="categoryGoodsSale.xLabels"
              :values="categoryGoodsSale.values"
            >
            </line-echart>
          </card>
          <card title="分类商品的收藏">
            <bar-echart
              :x-labels="categoryGoodsFavor.xLabels"
              :values="categoryGoodsFavor.values"
            ></bar-echart>
          </card>
        </el-col>
        <el-col :span="12">
          <card title="不同城市商品销量">
            <map-echart :map-data="addressGoodsSale"></map-echart>
          </card>
        </el-col>
      </el-row>
    </div>

    <!-- <div ref="chartRef" :style="{ width: '500px', height: '500px' }"></div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

import GoodsCard from '@/components/goods-card';
import Card from '@/base-ui/card';
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts';

import { IGoodsList } from '@/api/main/analysis/types';
import { useStore } from '@/store';

const store = useStore();
// 向 vuex 提交请求数据的 action
store.dispatch('dashboard/getDashBoadrDataAction');
// 获取顶部商品数据
const amountGoodsList = computed((item: any) => {
  return store.state.dashboard.amountGoodsList;
});
// 分类商品数量扇形图
const categoryGoodsCount = computed(() => {
  return store.state.dashboard.categoryGoodsCount.map((item: any) => {
    return { name: item.name, value: item.goodsCount };
  });
});
// 分类商品数量玫瑰图
const categoryGoodsCount2 = computed(() => {
  return store.state.dashboard.categoryGoodsCount.map((item: any) => {
    return { name: item.name, value: item.goodsCount };
  });
});
// 分类商品销量折线图
const categoryGoodsSale = computed(() => {
  const xLabels: string[] = [];
  const values: any[] = [];
  store.state.dashboard.categoryGoodsSale.forEach((item: any) => {
    xLabels.push(item.name);
    item.goodsCount = item.goodsCount ? item.goodsCount : 0;
    values.push(item.goodsCount);
  });
  return { xLabels, values };
});

// 分类商品收藏柱状图
const categoryGoodsFavor = computed(() => {
  const xLabels: string[] = [];
  const values: any[] = [];
  store.state.dashboard.categoryGoodsFavor.forEach((item: any) => {
    xLabels.push(item.name);
    item.goodsFavor = item.goodsFavor ? item.goodsFavor : 0;
    values.push(item.goodsFavor);
  });
  return { xLabels, values };
});

// 不同城市商品销量
const addressGoodsSale = computed(() => {
  return store.state.dashboard.addressGoodsSale.map((item: any) => {
    return { name: item.address, value: item.count };
  });
});
</script>

<style scoped lang="less">
.dashboard {
  background-color: #f5f5f5;
  .counts {
    margin-bottom: 25px;
    display: flex;
    flex: 1;
    .goods-card:not(:last-child) {
      margin-right: 8px;
    }
  }
  .charts {
    .content-row {
      margin-top: 20px;
    }
  }
}
</style>
