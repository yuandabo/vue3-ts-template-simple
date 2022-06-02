import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useStore } from '@/pinia/user'
const store = useStore()
import { getToken } from '@/utils/auth'

interface ResponseData<T> {
  status: number

  data: T

  message: string
}

interface HttpHeader {
  token?: string
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    ;(config.headers as HttpHeader).token = getToken() || ''
    return config
  },
  (error: AxiosError) => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom status
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response: AxiosResponse) => {
    const res = response.data as ResponseData<any>

    // if the custom status is not 20000, it is judged as an error.
    if (res.status !== 200) {
      // 文字提醒
      if (res.status === 411) {
        ElMessage({
          message: res.message || 'Error',
          type: 'warning',
          duration: 5 * 1000
        })
        return res
      }

      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.status === 410 || res.status === 422) {
        // to re-login
        ElMessageBox.confirm(
          res.message || '您已注销，可以取消以停留在此页面，或再次登录',
          '确认注销',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.resetToken()
          location.reload()
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error: AxiosError) => {
    ElMessage({
      message: error.message || '网络异常',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
