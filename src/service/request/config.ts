// 定义不同环境下的环境变量

let BASE_URL = '';
const TIME_OUT = 10000;
if (process.env.NODE_ENV === 'development') {
  // BASE_URL = 'http://152.136.185.210:5000/';
  BASE_URL = 'http://152.136.185.210:5000';
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://httpbin.org/prod';
} else if (process.env.NODE_ENV === 'test') {
  BASE_URL = 'http://httpbin.org/test';
}

export { BASE_URL, TIME_OUT };
