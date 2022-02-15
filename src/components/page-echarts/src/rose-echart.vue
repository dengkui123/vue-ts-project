<template>
  <div class="pie-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import BaseEchart from '@/base-ui/echart';
import { IDataType } from '../types';

const props = defineProps<{
  pieData: IDataType[];
}>();

// 参数
const options = computed(() => {
  return {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        // mark: { show: true },
        // dataView: { show: true, readOnly: false },
        // restore: { show: true },
        // saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [20, 100],
        center: ['50%', '40%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: props.pieData
      }
    ]
  };
});
</script>

<style scoped lang="less"></style>
