import {
	get,
} from '../base';

export function getUserWorth(data) {
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/ads/ltv/users`, data);
}

export function getGroupWorth(data) {
	const {
		trend,
		id,
	} = data;
	return get(`/projects/${sessionStorage.getItem(config.PROJECTID)}/ads/ltv/segmentations/${id}`, trend);
}