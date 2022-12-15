//使用axios
import axios from 'axios';


const axiosSwitch = (baseURL) => {

  //創建實例
  const instance = axios.create({
    baseURL: baseURL || 'http://phplaravel-885852-3108723.cloudwaysapps.com/',
    timeout: 10000
  });


  //返回之前設置攔截
  //axios攔截器 Add a request interceptor
  //加入token
  //config為axios create裡的設定
  // instance.interceptors.request.use((config) => {

  //   // Do something before request is sent
  //   const jwToken = global.auth.getToken();
  //   config.headers['Authorization'] = 'Bearer ' + jwToken;
    
  //   return config;


  // }, (error) => {
  //   // Do something with request error
  //   return Promise.reject(error);
  // });




  return instance;
}


export { axiosSwitch };
export default axiosSwitch();