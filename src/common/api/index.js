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