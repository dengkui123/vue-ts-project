<template>
  <div class="not-found">
    <img src="~@/assets/img/404.jpg" alt="404" @click="backHome" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter();
    const backHome = () => {
      router.push('/');
    };
    return {
      backHome
    };
  }
});
</script>

<style lang="less" scoped>
.not-found {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
}
</style>
