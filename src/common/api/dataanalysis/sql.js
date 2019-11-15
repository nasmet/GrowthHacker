import {
	get,
	post,
} from '../base';

export function getSqlTable(data) {
	return get('/sql/tables', data);
}

export function getColumns(data) {
	return get(`/sql/tables/${data.table}/columns`);
}

export function getSqlData(data) {
	return post('/sql/query', data);
}