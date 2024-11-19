import axios from "axios";
import { getToken } from './cookie'

const service = axios.create({
    baseURL: "/dev-api",
    timeout: 5000,
})

// 设置请求拦截器
service.interceptors.request.use(
    (config) => {
        if (getToken()) {
            console.log("进到 token 里面了" + getToken());
            config.headers["Authorization"] = "Bearer " + getToken();
        }
        return config;
    },
    (error) => {
        console.log(error)
        Promise.reject(error);
    }
);



// 设置响应拦截器
service.interceptors.response.use(
    (res) => {
        const code = res.data.code;
        const msg = res.data.msg;
        if (code !== 1000) {
            ElMessage({
                showClose: true,
                message: msg,
                type: 'error',
            })
            return Promise.reject(new Error(msg));
        } else {
            console.log("token是: " + res.data.data);
            return Promise.resolve(res.data);
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default service