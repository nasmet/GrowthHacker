import {
	get,
	post,
	del,
} from '../base';

export function createUserGroup(data) {
	return post(`/projects/${cookies.get(config.PROJECTID)}/segmentations`, data);
}

export function getUserGroups() {
	return get(`/projects/${cookies.get(config.PROJECTID)}/segmentations`);
}

export function deleteUserGroup(data) {
	return del(`/projects/${cookies.get(config.PROJECTID)}/segmentations/${data.id}`);
}

export function getUserGroupDetails(data) {
	const {
		id,
		trend,
	} = data;
	return get(`/projects/${cookies.get(config.PROJECTID)}/segmentations/${id}/users`, trend);
}

export function getUserScrutiny(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/insights/segmentations/latest/users`, data);
}

export function getUserScrutinyDetails(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/insights/segmentations/latest/users/${data.openId}`);
}

export function getUserScrutinyEvents(data) {
	const {
		openId,
		trend,
	} = data;
	return get(`/projects/${cookies.get(config.PROJECTID)}/insights/segmentations/latest/users/${openId}/events`, trend);
}

export function getUserScrutinyEventsBar(data) {
	const {
		openId,
		trend,
	} = data;
	return get(`/projects/${cookies.get(config.PROJECTID)}/insights/segmentations/latest/users/${openId}/eventsbar`, trend);
}

export function getPortraitArea(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/portrait/terr`, data);
}

export function getPortraitModel(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/portrait/phone`, data);
}

export function getPortraitTerminal(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/portrait/terminal`, data);
}

export function getHeatMap(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/heatmap`, data);
}