export default function reducer(state, action) {
	switch (action.type) {
		case 'open':
			return { ...state,
				show: true,
			};
		case 'close':
			return { ...state,
				show: false,
			};
		case 'add':
			state.projects.splice(0, 0, action.project);
			return {
				...state,
			};
		case 'remove':
			state.projects.splice(action.index, 1);
			return {
				...state,
			};
		case 'update':
			return { ...state,
				projects: action.projects,
			};
		default:
			throw new Error();
	}
}