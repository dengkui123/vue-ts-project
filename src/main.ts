import { createApp } from 'vue';
// import { service } from './service';
// 按需要引入 element-plus
import { globalRegister } from './global';
// 导入饿了么css动画
import 'element-plus/dist/index.css';
// 导入初始化css库
import 'normalize.css';
import './assets/css/index.less';
// 导入图标
import './assets/font/iconfont.js';

import App from './App.vue';
import store from './store';
import router from './router';
import { setupStore } from './store';
const app = createApp(App);
// 全局方法
globalRegister(app);
//调用初始化store函数
setupStore();
app.use(router);
app.use(store);
app.mount('#app');
