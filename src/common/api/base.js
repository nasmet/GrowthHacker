import axios from 'axios';
import * as config from '../config';

// axios 配置
axios.defaults.timeout = config.TIMEOUT;
axios.defaults.baseURL = config.EXAMPLE_BASEURL;

// http request 拦截器（所有发送的请求都要从这儿过一次），通过这个，我们就可以把token传到后台，我这里是使用sessionStorage来存储token等权限信息和用户信息，若要使用cookie可以自己封装一个函数并import便可使用
axios.interceptors.request.use((configs) => {
	const token = sessionStorage.getItem(config.TOKENKEY);
	configs.data = JSON.stringify(configs.data);
	configs.headers = {
		'Content-Type': 'application/json',
	};

	if (token) {
		configs.headers.Authorization = token;
	}
	return configs;
}, (err) => {
	return Promise.reject(err);
});

// http response 拦截器（所有接收到的请求都要从这儿过一次）
axios.interceptors.response.use((response) => {
	switch (response.data.code) {
		case 0:
			return response.data;
		default:
			return Promise.reject(response.data.message);
	}
}, (error) => {
	return Promise.reject(error.message);
});

/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params,
		}).then((response) => {
			resolve(response.data);
		}).catch((err) => {
			reject(err);
		});
	});
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data).then((response) => {
			resolve(response.data);
		}, (err) => {
			reject(err);
		});
	});
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data).then((response) => {
			resolve(response.data);
		}, (err) => {
			reject(err);
		});
	});
}