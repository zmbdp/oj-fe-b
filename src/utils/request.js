import axios from "axios";

const service = axios.create({
    baseURL: "/dev-api",
    timeout: 5000,
})

// 设置响应拦截器
service.interceptors.response.use(
    (res) => {
        const code = res.data.code;
        const msg = res.data.msg;
        if (code !== 1000) {
            // ElMessage.error(msg);
            ElMessage({
                showClose: true,
                message: res.data.msg,
                type: 'error',
            })
            return Promise.reject(new Error(msg));
        } else {
            return Promise.resolve(res.data);
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default service