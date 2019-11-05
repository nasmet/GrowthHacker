import {
	get,
	post,
	put,
	del,
	cancelRequestTask,
} from './base';

/**
 * 数据分析api接口
 * 
 */

export function cancelRequest() {
	cancelRequestTask();
}

export function getSqlTable(data) {
	return get('/sql/tables', data);
}

export function getColumns(data) {
	return get(`/sql/tables/${data.table}/columns`);
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

export function deleteProject(data) {
	const {
		id,
	} = data;
	return del(`/projects/${id}`);
}

export function getDataCenter(data) {
	return get('/event_entities', data);
}

export function getOriginData(data) {
	return get('/metadatas', data);
}

export function createOriginData(data) {
	return post('/metadatas', data);
}

export function deleteOriginData(data) {
	return del(`/metadatas/${data.id}`, data);
}

export function getOriginDataValues(data) {
	const {
		id,
		trend,
	} = data;
	return get(`/metadatas/${id}/values`, trend);
}

export function createOriginDataValues(data) {
	const {
		id,
		trend,
	} = data;
	return post(`/metadatas/${id}/values`, trend);
}

export function deleteOriginDataValues(data) {
	const {
		id,
		valueId,
	} = data;
	return del(`/metadatas/${id}/values/${valueId}`);
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

export function getEventDetails(data) {
	return get(`/event_entities/${data.id}`);
}

export function addBindVariables(data) {
	const {
		id,
		trend,
	} = data;
	return post(`/event_entities/${id}/variables`, trend);
}

export function deleteBindVariables(data) {
	const {
		eventId,
		variableId,
	} = data;
	return del(`/event_entities/${eventId}/variables/${variableId}`);
}

export function getBoards() {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/charts`);
}

export function createBoard(data) {
	return post(`/projects/${sessionStorage.getItem(config.PROJECTID)}/charts`, data);
}

export function deleteBoard(data) {
	const {
		id,
	} = data;
	return del(`/projects/${sessionStorage.getItem(config.PROJECTID)}/charts/${id}`);
}

export function getDataBoard(data) {
	return post(`/projects/${sessionStorage.getItem(config.PROJECTID)}/charts/chartdata`, data);
}

export function getPortraitArea(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/portrait/terr`, data);
}

export function getPortraitModel(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/portrait/phone`, data);
}

export function getPortraitTerminal(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/portrait/terminal`, data);
}

export function getUserScrutiny(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/insights/segmentations/latest/users`, data);
}

export function getUserScrutinyDetails(data) {
	const {
		openId,
	} = data;
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/insights/segmentations/latest/users/${openId}`);
}

export function getUserScrutinyEvents(data) {
	const {
		openId,
		trend,
	} = data;
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/insights/segmentations/latest/users/${openId}/events`, trend);
}

export function getUserScrutinyEventsBar(data) {
	const {
		openId,
		trend,
	} = data;
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/insights/segmentations/latest/users/${openId}/eventsbar`, trend);
}

export function createUserGroup(data) {
	return post(`/projects/${sessionStorage.getItem(config.PROJECTID)}/segmentations`, data);
}

export function getUserGroups() {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/segmentations`);
}

export function deleteUserGroup(data) {
	const {
		id,
	} = data;
	return del(`/projects/${sessionStorage.getItem(config.PROJECTID)}/segmentations/${id}`);
}

export function getUserGroupDetails(data) {
	const {
		id,
		trend,
	} = data;
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/segmentations/${id}/users`, trend);
}


export function getShareHeader(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/share/overall/header`, data);
}

export function getTop10Share(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/share/overall/top10share`, data);
}

export function getTop10New(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/share/overall/top10new`, data);
}

export function getTop10Open(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/share/overall/top10open`, data);
}

export function getGenderDistribute(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/share/distribute/gender`, data);
}

export function getShareDistribute(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/share/distribute/destination`, data);
}

export function getAreaDistribute(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/share/distribute/district`, data);
}

export function getShareTrend(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/share/trending`, data);
}

export function getShareAnalysis(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/share/trigger`, data);
}

export function getUserShare(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/share/user`, data);
}

export function getAdCount(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/ads/ltv`, data);
}

export function getAdAnalysis(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/ads/ltv_analysing`, data);
}

export function getARPUData(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/ads/arpu`, data);
}

export function getARPUDaily(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/ads/arpu_daily`, data);
}

export function getARPURate(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/ads/arpu_click`, data);
}

export function getUserWorth(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/ads/ltv/wechat_users`, data);
}

export function getGroupWorth(data) {
	const {
		trend,
		id,
	} = data;
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/ads/ltv/segmentations/${id}`, trend);
}

/**
 * 千人千面api接口
 * 
 */

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