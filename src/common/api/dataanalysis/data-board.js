import {
	get,
	post,
	del,
} from '../base';

export function getBoards() {
	return get(`/projects/${cookies.get(config.PROJECTID)}/charts`);
}

export function deleteBoard(data) {
	return del(`/projects/${cookies.get(config.PROJECTID)}/charts/${data.id}`);
}

export function getDataBoard(data) {
	return post(`/projects/${cookies.get(config.PROJECTID)}/charts/chartdata`, data);
}