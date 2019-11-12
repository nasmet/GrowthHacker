import React from 'react';
import {
	Nav,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import styles from './index.module.scss';
import {
	navs,
} from './config';

function ProjectData({
	location,
	children,
}) {
	const {
		pathname,
	} = location;
	const arr = pathname.split('/');
	const path = `/${arr[1]}/${arr[2]}/${arr[3]}`;
	const header = <span className={styles.fusion}>{sessionStorage.getItem('PROJECTNAME')}</span>;

	return (
		<Components.Wrap>
			<Nav
        		direction="hoz"
        		triggerType="hover"
        		selectedKeys={[path]}
        		defaultSelectedKeys={['/growthhacker/projectdata/db']} 
        		type='secondary'
        		header={header}
      		>
        		{navs.map(model.traverse)}
      		</Nav>
      		{children}
    	</Components.Wrap>
	);
}

export default withRouter(ProjectData);