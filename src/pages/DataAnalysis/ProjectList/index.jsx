import React from 'react';
import List from './components/List';
import CreateProject from './components/CreateProject';
import reducer from './reducer';

export default function ProjectList() {	
	return (
		<model.Provider reducer={reducer} initialState={{
			show: false,
			projects: [],
		}}>
			<List />
	    	<CreateProject />
    	</model.Provider>
	);
}