export default function reducer(state, action) {
	return {
		projects: projects(state.projects, action),
		show: show(state.show, action),
	}
}

function projects(state, action) {
	switch (action.type) {
		case 'add':
			return state.concat([action.project]);
		case 'remove':
			const newState = [...state];
			newState.splice(action.index, 1);
			return newState;
		case 'update':
			return action.projects;
		default:
			return state;
	}
}

function show(state, action) {
	switch (action.type) {
		case 'open':
			return true;
		case 'close':
			return false;
		default:
			return state;
	}
}