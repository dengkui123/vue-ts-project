<template>
  <div class="pie-echart">
    <base-echart :options="options" height="715px"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import * as echarts from 'echarts';
import BaseEchart from '@/base-ui/echart';
import { IDataType } from '../types';

import { convertData } from '../utils/convert-data';
const props = defineProps<{
  title?: string;
  mapData?: IDataType[];
}>();
const options = computed(() => {
  return {
    backgroundColor: '#fff',
    title: {
      text: '不同城市商品销量',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ' : ' + params.value[2];
      }
    },
    legend: {
      orient: 'vertical',
      right: 20,
      top: 10,
      data: ['销售量'],
      textStyle: {
        color: 'rgb(55, 162, 218)'
      }
    },
    visualMap: {
      min: 0,
      max: 60000,
      left: 20,
      bottom: 20,
      calculable: true,
      text: ['高', '低'],
      inRange: {
        color: ['rgb(159, 230, 184)', 'rgb(50, 197, 233)', 'rgb(55, 162, 218)']
      },
      textStyle: {
        color: 'rgb(55, 162, 218)'
      }
    },
    geo: {
      map: 'china',
      roam: 'scale',
      label: {},
      itemStyle: {
        areaColor: 'rgb(19, 91, 153)',
        borderColor: 'rgb(9, 54, 95)'
      },
      emphasis: {
        areaColor: 'rgb(10, 105, 187)',
        itemStyle: {
          areaColor: 'skyblue',
          borderColor: 'rgb(9, 54, 95)'
        }
      }
    },
    series: [
      {
        name: '销售量',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(props.mapData),
        symbolSize: 16,

        emphasis: {
          label: {
            show: true
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2
          }
        }
      },
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false
        }
      }
    ]
  };
});
</script>

<style scoped lang="less"></style>
