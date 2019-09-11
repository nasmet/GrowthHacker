import {
	get,
	post,
	put,
} from './base';

export function find(data) {
	return get('/trends', data);
}

export function getEventAnalysis(data) {
	return get('/eventanalysis', data);
}

export function getDataCenter(data) {
	return get('/datacenter', data);
}

export function getDataBoard(data) {
	const {
		project_id,
		chart_id,
	} = data;

	return post(`/projects/${project_id}/charts/${chart_id}/chartdata`, data);
}

export function getWeiboList(data) {
	return get('/weibolist', data);
}

export function getEarlyWarning(data) {
	return get('/earlywarning', data);
}

export function getMonitor(data) {
	return get('/monitor', data);
}

export function getMonitorAnalysis(data) {
	return get('/monitoranalysis', data);
}

export function getSpotAnalysis(data) {
	return get('/spotanalysis', data);
}

export function getExponentAnalysis(data) {
	return get('/exponentanalysis', data);
}