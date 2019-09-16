import {
	get,
	post,
	put,
	del,
} from './base';

export function find(data) {
	return get('/trends', data);
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

export function getDataBoard(data) {
	const {
		project_id,
		chart_id,
	} = data;
	return post(`/projects/${project_id}/charts/${chart_id}/chartdata`, data);
}

export function getDataCenter(data) {
	return get('/event_entities', data);
}

export function getEventAnalysis(data) {
	return get('/eventanalysis', data);
}

export function deleteEvent(data) {
	const {
		id,
	} = data;
	return del(`/event_entities/${id}`, data);
}

export function createEvent(data) {
	return post('/event_entities', data);
}

export function getSqlTable(data) {
	return get('/sql/tables', data);
}

export function getSqlData(data) {
	return post('/sql/query', data);
}

export function getProjects(data) {
	return get('/projects', data);
}

export function createProject(data) {
	return post('/projects', data);
}

export function createBoard(data) {
	const {
		id,
		trend,
	} = data;
	return post(`/projects/${id}`, trend);
}