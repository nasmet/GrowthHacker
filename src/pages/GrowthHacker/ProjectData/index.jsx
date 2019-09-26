import React, {
	Component,
	useState,
	useEffect
} from 'react';
import {
	Tab,
	Nav,
} from '@alifd/next';
import {
	withRouter,
	Link,
	Redirect,
	Switch,
	Route,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import Layout from '@icedesign/layout';
import styles from './index.module.scss';
import projectDataConfig from './projectDataConfig';

// const {
// 	Item
// } = Tab;

const {
	Item,
	SubNav,
} = Nav;

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
			<SubNav key={nav.path} label={word(nav.name)}>
        		{nav.sub.map(fn)}
      		</SubNav>
		);
	}
	return (
		<Item key={nav.path}>
      		<Link to={nav.path} className="ice-menu-link">
        		{word(nav.name)}
      		</Link>
   		</Item>
	);
};

function ProjectData({
	location,
	children,
}) {
	const {
		pathname,
	} = location;

	let projectInfo = sessionStorage.getItem('projectinfo');
	if (projectInfo) {
		projectInfo = JSON.parse(projectInfo);
	} else {
		projectInfo = {};
	}

	const {
		id,
		name,
		domain_name,
		type,
		desc
	} = projectInfo;

	sessionStorage.setItem('projectId', id);

	const info = [{
		id: 0,
		name: '项目名称',
		value: name
	}, {
		id: 1,
		name: '项目介绍',
		value: desc
	}, ];

	return (
		<div>
			<Components.Introduction info={info} />
			<Nav
        		className="ice-menu-custom"
        		type= 'primary'
        		direction="hoz"
        		triggerType="hover"
        		selectedKeys={[pathname]}
        		defaultSelectedKeys={['/growthhacker/projectdata/db']} 
      		>
        		{projectDataConfig.map(traversing)}
      		</Nav>
      		{children}
    	</div>
	);
}

export default withRouter(ProjectData);