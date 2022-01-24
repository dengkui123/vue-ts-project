<template>
  <el-icon :size="size"><component :is="name"></component></el-icon>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: {
      required: true,
      type: String
    },
    size: {
      type: [String, Number],
      default: 17
    }
  },
  setup() {
    return {};
  }
});
</script>

<style lang="less" scoped></style>
