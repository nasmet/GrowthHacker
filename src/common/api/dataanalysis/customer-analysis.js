import {
	get,
} from '../base';

export function getUserWorth(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/ads/ltv/users`, data);
}

export function getGroupWorth(data) {
	return get(`/projects/${cookies.get(config.PROJECTID)}/ads/ltv/segmentations`, data);
}