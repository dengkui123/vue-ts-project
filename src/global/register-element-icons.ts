//按需导入图标组件
import type { App } from 'vue';

import {
  User,
  Lock,
  Iphone,
  Loading,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Operation,
  ArrowDown,
  SwitchButton,
  Search,
  Refresh,
  Edit,
  Delete,
  Plus,
  Warning
} from '@element-plus/icons-vue';

export const icons = [
  User,
  Lock,
  Iphone,
  Loading,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Operation,
  ArrowDown,
  SwitchButton,
  Search,
  Refresh,
  Edit,
  Delete,
  Plus,
  Warning
];
//按需导出图标**组件**
export default function (app: App): void {
  for (const icon of icons) {
    app.component(icon.name, icon);
  }
}
