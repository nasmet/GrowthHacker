import React, {
	useReducer,
	createContext,
} from 'react';
import List from './components/List';
import CreateProject from './components/CreateProject';
import reducer from './reducer';

export const Context = createContext();

export default function ProjectList() {
	const [state, dispatch] = useReducer(reducer, {
		show: false,
		projects: [],
	});

	return (
		<Context.Provider value={{state,dispatch}}>
			<List />
	    	<CreateProject />
    	</Context.Provider>
	);
}