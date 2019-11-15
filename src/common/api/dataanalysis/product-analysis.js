import {
	post,
	put,
} from '../base';

export function createBoard(data) {
	return post(`/projects/${sessionStorage.getItem(config.PROJECTID)}/charts`, data);
}

export function modifyBoard(data) {
	return put(`/projects/${sessionStorage.getItem(config.PROJECTID)}/charts/${data.chartId}`, data);
}