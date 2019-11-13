import {
	get,
	post,
	del,
} from '../base';

export function getStrategies(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/strategies`, data);
}

export function createStrategies(data) {
	return post(`/projects/${sessionStorage.getItem(config.PROJECTID)}/strategies`, data);
}

export function deleteStrategies(data) {
	return del(`/projects/${sessionStorage.getItem(config.PROJECTID)}/strategies/${data.id}`);
}

export function getRules(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/rules`, data);
}

export function createRules(data) {
	return post(`/projects/${sessionStorage.getItem(config.PROJECTID)}/rules`, data);
}

export function deleteRules(data) {
	return del(`/projects/${sessionStorage.getItem(config.PROJECTID)}/rules/${data.id}`);
}

export function getSchemes(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/schemes`, data);
}

export function createSchemes(data) {
	return post(`/projects/${sessionStorage.getItem(config.PROJECTID)}/schemes`, data);
}

export function deleteSchemes(data) {
	return del(`/projects/${sessionStorage.getItem(config.PROJECTID)}/schemes/${data.id}`);
}

export function getTags(data) {
	return get('/labels', data);
}

export function createTags(data) {
	return post('/labels', data);
}

export function deleteTags(data) {
	return del(`/labels/${data.id}`);
}

export function getUsers(data) {
	return get('/api/wechat_user', data);
}

export function createUserTag(data) {
	const {
		id,
		trend,
	} = data;
	return post(`/api/wechat_user/${id}/labels`, trend);
}

export function deleteUserTag(data) {
	const {
		openId,
		labelId,
	} = data;
	return del(`/api/wechat_user/${openId}/labels/${labelId}`);
}

export function createAccount(data) {
	return post('/admins', data);
}

export function login(data) {
	return post('/sessions', data);
}

export function loginOut() {
	return del('/sessions');
}