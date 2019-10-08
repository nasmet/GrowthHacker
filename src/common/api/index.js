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
	return post(`/projects/${id}/charts`, trend);
}

export function getBoards(data) {
	const {
		id,
	} = data;
	return get(`/projects/${id}/charts`);
}

export function getPortraitArea(data) {
	const {
		id,
		trend,
	} = data;
	return get(`/projects/${id}/portrait/terr`, trend);
}

export function getPortraitModel(data) {
	const {
		id,
		trend,
	} = data;
	return get(`/projects/${id}/portrait/phone`, trend);
}

export function getPortraitTerminal(data) {
	const {
		id,
		trend,
	} = data;
	return get(`/projects/${id}/portrait/terminal`, trend);
}

export function getUserScrutiny(data) {
	const {
		id,
		trend,
	} = data;
	return get(`/projects/${id}/insights/segmentations/latest/users`, trend);
}

export function getUserScrutinyDetails(data) {
	const {
		projectId,
		openId,
	} = data;
	return get(`/projects/${projectId}/insights/segmentations/latest/users/${openId}`);
}

export function getUserScrutinyEvents(data) {
	const {
		projectId,
		openId,
		trend,
	} = data;
	return get(`/projects/${projectId}/insights/segmentations/latest/users/${openId}/events`, trend);
}

export function getUserScrutinyEventsBar(data) {
	const {
		projectId,
		openId,
		trend,
	} = data;
	return get(`/projects/${projectId}/insights/segmentations/latest/users/${openId}/eventsbar`, trend);
}

export function createUserGroup(data) {
	const {
		projectId,
		trend,
	} = data;
	return post(`/projects/${projectId}/segmentations`, trend);
}

export function getUserGroups(data) {
	const {
		projectId,
	} = data;
	return get(`/projects/${projectId}/segmentations`);
}

export function deleteUserGroup(data) {
	const {
		projectId,
		id,
	} = data;
	return del(`/projects/${projectId}/segmentations/${id}`);
}

export function getUserGroupDetails(data) {
	const {
		projectId,
		id,
		trend,
	} = data;
	return get(`/projects/${projectId}/segmentations/${id}/users`, trend);
}

export function deleteBoard(data) {
	const {
		projectId,
		id,
	} = data;
	return del(`/projects/${projectId}/charts/${id}`);
}

export function getShareHeader(data) {
	const {
		projectId,
		trend,
	} = data;
	return get(`/projects/${projectId}/share/overall/header`, trend);
}

export function getTop10Share(data) {
	const {
		projectId,
		trend,
	} = data;
	return get(`/projects/${projectId}/share/overall/top10share`, trend);
}

export function getTop10New(data) {
	const {
		projectId,
		trend,
	} = data;
	return get(`/projects/${projectId}/share/overall/top10new`, trend);
}

export function getTop10Open(data) {
	const {
		projectId,
		trend,
	} = data;
	return get(`/projects/${projectId}/share/overall/top10open`, trend);
}

export function getGenderDistribute(data) {
	const {
		projectId,
		trend,
	} = data;
	return get(`/projects/${projectId}/share/distribute/gender`, trend);
}

export function getShareDistribute(data) {
	const {
		projectId,
		trend,
	} = data;
	return get(`/projects/${projectId}/share/distribute/destination`, trend);
}

export function getAreaDistribute(data) {
	const {
		projectId,
		trend,
	} = data;
	return get(`/projects/${projectId}/share/distribute/district`, trend);
}

export function getShareTrend(data) {
	const {
		projectId,
		trend,
	} = data;
	return get(`/projects/${projectId}/share/trending`, trend);
}