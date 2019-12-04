import {
	get,
	post,
	del,
	upload,
} from '../base';

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
	return del(`/metadatas/${data.id}`);
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
	return del(`/event_entities/${data.id}`);
}

export function createEvent(data) {
	return post('/event_entities', data);
}

export function getEventDetails(data) {
	return get(`/event_entities/${data.id}`);
}

export function importAllEvent(data) {
	return upload(data);
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

export function getEventVariableValues(data) {
	return get(`/event_entities/${data.id}/enums`);
}

export function createEventVariableValue(data) {
	const {
		id,
		trend,
	} = data;
	return post(`/event_entities/${id}/enums`, trend);
}

export function deleteEventVariableValue(data) {
	const {
		variableId,
		variableValueId,
	} = data;
	return del(`/event_entities/${variableId}/enums/${variableValueId}`);
}