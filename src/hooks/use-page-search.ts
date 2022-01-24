import { ref } from 'vue';
import PageContent from '@/components/page-content';
export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  // 调用子组件（pageContent）的获取数据的方法
  // 该方法在 <script setup> 语法糖下需要将子组件方法用 defineExpose 暴露出来
  const handleReset = () => {
    pageContentRef.value.getPageData();
  };
  const handleSearch = (formData: any) => {
    pageContentRef.value.getPageData(formData);
  };
  return [pageContentRef, handleReset, handleSearch];
}
