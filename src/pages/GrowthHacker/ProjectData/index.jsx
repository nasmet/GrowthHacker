import React, {
	Component,
} from 'react';
import {
	Nav,
} from '@alifd/next';
import {
	withRouter,
	Link,
} from 'react-router-dom';
import styles from './index.module.scss';
import {
	navs,
} from './config';

const word = (name) => {
	return (
		<span className="ice-menu-item-text">
      		{name}
    	</span>
	);
};

const traversing = function fn(nav) {
	if (nav.sub && utils.isArray(nav.sub)) {
		return (
			<Nav.SubNav key={nav.path} selectable label={word(nav.name)}>
        		{nav.sub.map(fn)}
      		</Nav.SubNav>
		);
	}
	return (
		<Nav.Item key={nav.path}>
      		<Link to={nav.path} className="ice-menu-link">
        		{word(nav.name)}
      		</Link>
   		</Nav.Item>
	);
};

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
        		{navs.map(traversing)}
      		</Nav>
      		{children}
    	</Components.Wrap>
	);
}

export default withRouter(ProjectData);