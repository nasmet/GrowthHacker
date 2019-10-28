import axios from 'axios';
import * as config from '../config';

// axios 配置
axios.defaults.timeout = config.TIMEOUT;
axios.defaults.baseURL = config.BASEURL;
// axios.defaults.withCredentials = true;

// http request 拦截器（所有发送的请求都要从这儿过一次），通过这个，我们就可以把token传到后台，我这里是使用sessionStorage来存储token等权限信息和用户信息，若要使用cookie可以自己封装一个函数并import便可使用
axios.interceptors.request.use((configs) => {
	configs.data = JSON.stringify(configs.data);
	configs.headers = {
		'Content-Type': 'application/json',
	};
	const token = sessionStorage.getItem(config.TOKENKEY);
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
		case 20103:
			setTimeout(() => {
				model.history.push('/user/login');
			});
			return Promise.reject(response.data.message);
		default:
			return Promise.reject(response.data.message);
	}
}, (error) => {
	return Promise.reject(error.message);
});

const CancelToken = axios.CancelToken;
export let cancelRequestTask = () => {};

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
			cancelToken: new CancelToken(function executor(c) {
				cancelRequestTask = c;
			}),
		}).then((response) => {
			resolve(response.data);
		}).catch((err) => {
			if (!err) {
				return;
			}
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
		axios.post(url, data, {
			cancelToken: new CancelToken(function executor(c) {
				cancelRequestTask = c;
			}),
		}).then((response) => {
			resolve(response.data);
		}, (err) => {
			if (!err) {
				return;
			}
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
		axios.put(url, data, {
			cancelToken: new CancelToken(function executor(c) {
				cancelRequestTask = c;
			}),
		}).then((response) => {
			resolve(response.data);
		}, (err) => {
			if (!err) {
				return;
			}
			reject(err);
		});
	});
}

/**
 * delete 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios.delete(url, {
			params,
			cancelToken: new CancelToken(function executor(c) {
				cancelRequestTask = c;
			}),
		}).then((response) => {
			resolve(response.data);
		}, (err) => {
			if (!err) {
				return;
			}
			reject(err);
		});
	});
}