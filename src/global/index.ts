// 按需导入图标入口

import { App } from 'vue';
import registerElementIcons from './register-element-icons';

//app.use 默认执行其中的函数并且传入app对象
export function globalRegister(app: App): void {
  // app.use(registerElementIcons);或
  registerElementIcons(app);
}
