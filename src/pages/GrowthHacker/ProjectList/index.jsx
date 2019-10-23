import React, {
	useRef,
} from 'react';
import {
	withRouter,
} from 'react-router-dom';
import List from './components/List';
import CreateProject from './components/CreateProject';

function ProjectList({
	history,
}) {
	const refCP = useRef(null);
	const refList = useRef(null);

	const createProject = () => {
		refCP.current.onShow();
	};

	const addProject = (e) => {
		refList.current.addProject(e);
	};

	const jump = () => {
		history.push('/growthhacker/projectdata');
	};

	return (
		<div>
			<List createProject={createProject} jump={jump} ref={refList} />
	    	<CreateProject addProject={addProject} ref={refCP} />
    	</div>
	);
}

export default withRouter(ProjectList);