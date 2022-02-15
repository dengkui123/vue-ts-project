import { App } from 'vue';

import { formatLocalTime, formatTimestamp } from '@/utils/date-format';
import { formatNumber } from '@/utils/number-format';
export function registerProperties(app: App) {
  // 格式化
  app.config.globalProperties.$dayjs = {
    // 返回本地
    formatLocalTime,
    formatTimestamp
  };

  app.config.globalProperties.$number = {
    formatNumber
  };
}
