import {
	get,
	post,
	del,
} from '../base';

export function getStrategies(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/strategies`, data);
}

export function createStrategies(data) {
	return post(`/projects/${cookies.get(config.PROJECTID)}/strategies`, data);
}

export function deleteStrategies(data) {
	return del(`/projects/${cookies.get(config.PROJECTID)}/strategies/${data.id}`);
}

export function getRules(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/rules`, data);
}

export function createRules(data) {
	return post(`/projects/${cookies.get(config.PROJECTID)}/rules`, data);
}

export function deleteRules(data) {
	return del(`/projects/${cookies.get(config.PROJECTID)}/rules/${data.id}`);
}

export function getSchemes(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/schemes`, data);
}

export function createSchemes(data) {
	return post(`/projects/${cookies.get(config.PROJECTID)}/schemes`, data);
}

export function deleteSchemes(data) {
	return del(`/projects/${cookies.get(config.PROJECTID)}/schemes/${data.id}`);
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
	return get('/api/user', data);
}

export function createUserTag(data) {
	const {
		id,
		trend,
	} = data;
	return post(`/api/user/${id}/labels`, trend);
}

export function deleteUserTag(data) {
	const {
		openId,
		labelId,
	} = data;
	return del(`/api/user/${openId}/labels/${labelId}`);
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