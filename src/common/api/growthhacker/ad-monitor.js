import {
	get,
} from '../base';

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