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

import router from './router';
import store from './store';

const app = createApp(App);

globalRegister(app);
app.use(router);
app.use(store);
app.mount('#app');

// request.request({
//   url: '/api/home/multidata',
//   method: 'get',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config');
//       return config;
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的response');
//       return res;
//     }
//   }
// });

// interface DataType {
//   data: any;
//   returnCode: string;
//   success: boolean;
// }

// service
//   .get<DataType>({
//     url: '/api/home/multidata',
//     // method: 'get',
//     showLoading: true
//   })
//   .then((res) => {
//     console.log(res);
//     console.log(res.data);
//   });
