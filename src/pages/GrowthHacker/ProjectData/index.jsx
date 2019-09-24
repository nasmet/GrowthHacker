import React, {
	Component,
	useState,
	useEffect
} from 'react';
import {
	Tab
} from '@alifd/next';
import {
	withRouter
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import projectDataConfig from './projectDataConfig';

const {
	Item
} = Tab;

function ProjectData({
	location
}) {
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
	const info = [{
		id: 0,
		name: '项目名称',
		value: name
	}, {
		id: 1,
		name: '项目介绍',
		value: desc
	}, ];

	const renderTab = () => {
		return projectDataConfig.map(item => {
			const Content = item.component;
			return (
				<Item key={item.key} title={item.tab} >
          			<div className={styles.marginTop10}>
            			<Content projectId={id} />
          			</div>
        		</Item>
			)
		});
	};

	return (
		<div>
			<Components.Introduction info={info} />
			<Tab defaultActiveKey="ua">
				{ renderTab() }
      		</Tab>
    	</div>
	);
}

export default withRouter(ProjectData);