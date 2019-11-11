import {
	get,
	post,
	del,
} from '../base';

export function getProjects(data) {
	return get('/projects', data);
}

export function createProject(data) {
	return post('/projects', data);
}

export function deleteProject(data) {
	return del(`/projects/${data.id}`);
}