import {
	get,
	post,
	put,
	del,
	cancelRequestTask,
} from './base';
// export function find(data) {
// 	return get('/trends', data);
// }

// export function getWeiboList(data) {
// 	return get('/weibolist', data);
// }

// export function getEarlyWarning(data) {
// 	return get('/earlywarning', data);
// }

// export function getMonitor(data) {
// 	return get('/monitor', data);
// }

// export function getMonitorAnalysis(data) {
// 	return get('/monitoranalysis', data);
// }

// export function getSpotAnalysis(data) {
// 	return get('/spotanalysis', data);
// }

// export function getExponentAnalysis(data) {
// 	return get('/exponentanalysis', data);
// }

export function cancelRequest() {
	cancelRequestTask();
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

export function deleteProject(data) {
	const {
		id,
	} = data;
	return del(`/projects/${id}`);
}

export function getDataCenter(data) {
	return get('/event_entities', data);
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

export function getBoards(data) {
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
	const {
		chart_id,
		trend,
	} = data;
	return post(`/projects/${sessionStorage.getItem(config.PROJECTID)}/charts/${chart_id}/chartdata`, trend);
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

export function getUserGroups(data) {
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