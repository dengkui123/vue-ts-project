import { App } from 'vue';

import { formatLocalTime, formatTimestamp } from '@/utils/date-format';

export function registerProperties(app: App) {
  // 格式化
  app.config.globalProperties.$dayjs = {
    // 返回本地
    formatLocalTime,
    formatTimestamp
  };
}
