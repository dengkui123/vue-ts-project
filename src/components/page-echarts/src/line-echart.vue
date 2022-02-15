<template>
  <div class="pie-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import * as echarts from 'echarts';
import BaseEchart from '@/base-ui/echart';
import { IDataType } from '../types';
import { progressProps } from 'element-plus';

const props = defineProps<{
  title?: string;
  xLabels: string[];
  values: any[];
}>();

// 参数
const options = computed(() => ({
  legend: {
    data: ['销量']
  },
  // tooltip: {
  //   trigger: 'axis',
  //   axisPointer: {}
  // },

  xAxis: {
    data: props.xLabels
  },
  yAxis: {},

  series: [
    {
      name: '销量',
      type: 'line',
      // smooth: true,
      sampling: 'average',
      data: props.values,
      itemStyle: {
        // normal: {
        //   // 拐点上显示数值
        //   label: {
        //     // show: true
        //   },
        //   borderColor: 'red', // 拐点边框颜色
        //   lineStyle: {
        //     width: 4 // 设置线宽
        //   }
        // }
      },
      label: {
        show: true, //显示圆点顶部的数字
        position: 'top', //数字显示位置
        padding: 3,
        color: '#fff',
        offset: [0, -5],
        backgroundColor: 'rgb(50, 197, 233)',
        borderRadius: [5, 5, 5, 5]
        // https://blog.csdn.net/joe0516/article/details/85684297
      },
      areaStyle: {
        // 填充色渐变
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#3aa7ff' },
          { offset: 0.5, color: 'rgba(58, 167, 255,0.4)' },
          { offset: 1, color: 'rgba(58, 167, 255,0)' }
        ])
      }
    }
  ]
}));
</script>

<style scoped lang="less"></style>
