import * as base from './base';

export function find(data) {
	return base.get('/trends', data);
}