import {
	get,
	post,
	del,
} from '../base';

export function getBoards() {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/charts`);
}

export function deleteBoard(data) {
	return del(`/projects/${sessionStorage.getItem(config.PROJECTID)}/charts/${data.id}`);
}

export function getDataBoard(data) {
	return post(`/projects/${sessionStorage.getItem(config.PROJECTID)}/charts/chartdata`, data);
}