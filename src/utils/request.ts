import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    function (data, headers) {
      // 对发送的 data 进行任意转换处理
      console.log(data, headers);
      data = JSON.stringify(data); // 转换
      return data;
    },
  ],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function (data) {
      // 对接收的 data 进行任意转换处理
      console.log(data);
      data = JSON.parse(data); // 转换
      return data;
    },
  ],
});

request.interceptors.response.use(
  function (response) {
    console.log("接收的响应", response);
    // return response.data;
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
