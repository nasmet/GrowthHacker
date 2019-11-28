import {
	post,
	put,
} from '../base';

export function createBoard(data) {
	return post(`/projects/${cookies.get(config.PROJECTID)}/charts`, data);
}

export function modifyBoard(data) {
	return put(`/projects/${cookies.get(config.PROJECTID)}/charts/${data.chartId}`, data);
}