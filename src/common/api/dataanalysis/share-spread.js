import {
	get,
} from '../base';

export function getShareHeader(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/share/overall/header`, data);
}

export function getTop10Share(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/share/overall/top10share`, data);
}

export function getTop10New(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/share/overall/top10new`, data);
}

export function getTop10Open(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/share/overall/top10open`, data);
}

export function getShareDistribute(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/share/distribute/destination`, data);
}

export function getShareTrend(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/share/trending`, data);
}

export function getShareAnalysis(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/share/trigger`, data);
}

export function getUserShare(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/share/user`, data);
}