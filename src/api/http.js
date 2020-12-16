import axios from "axios";
//qs 第三方库
import qs from "qs";
/**
 * 根据环境变量区分运行环境
 */
switch (process.env.NODE_ENV) {
  case "production":
    axios.defaults.baseURL = "http://api.kelvin.com";
    break;
  case "test":
    axios.defaults.baseURL = "http://localhost:8080";
    break;
  default:
    //默认开发环境
    axios.defaults.baseURL = "http://localhost:9090";
}

/**
 * 设置超时时间和跨域是否允许携带凭证
 */
axios.defaults.timeout = 10000; //毫秒
axios.defaults.withCredentials = false;//使用tocken 不需cookie

/**
 * 设置请求传递数据的格式（看服务器要求是什么格式）
 * x-www-form-urlencoded
 */
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.transformRequest = (data) => qs.stringify(data);

/**
 *  设置拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器
 * TOKEN校验(JWT),接收服务器返回的token,存储到vuex/本地存储中，
 * 第一次向服务器发请求，我们应该把token带上
 */
axios.interceptors.request.use(
  (config) => {
    //携带token
    let token = localStorage.getItem("token");
    token && (config.headers.Authorization = token);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/**
 * 响应拦截器
 */

axios.defaults.validateStatus = (status) => {
  //自定义响应成功的HTTP状态码
  return /^(2|3)\d{2}$/.test(status);
};

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let { response } = error;
    if (response) {
      //服务器错误
      switch (response.status) {
        case 401:
          //未登录
          break;
        case 403:
          //token 过期
          break;
        case 404:
          //找不到地址
          break;
      }
    } else {
      //服务器无响应或网络不通
      if (!window.navigator.onLine) {
        //断网处理：可以跳转到断网页面
        return;
      }
      return Promise.reject(error);
    }
  }
);

export default axios;
