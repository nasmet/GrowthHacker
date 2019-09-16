import React, {
	Component,
	useState,
	useEffect,
	useRef,
	useContext,
	useCallback,
	useMemo,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Table,
	Message,
	Loading,
	Pagination,
	Icon,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import projectDataConfig from './projectDataConfig';

const {
	Item,
} = Tab;

function ProjectData({
	location,
}) {
	let projectInfo = sessionStorage.getItem('projectinfo');
	if (projectInfo) {
		projectInfo = JSON.parse(projectInfo);
	} else {
		projectInfo = {
			id: 1,
			name: '灵蛇',
		}
	}
	const {
		name,
		id,
	} = projectInfo;

	const rendTab = () => {
		return projectDataConfig.map((item) => {
			const Content = item.component;
			return (
				<Item key={item.key} title={item.tab} >
          			<div className={styles.marginTop10}>
            			<Content projectId={id} />
          			</div>
        		</Item>
			);
		});
	};

	return ( 
		<div>
			<IceContainer>
				<div className={styles.item1}>
					<span>项目名称：</span>
					<div className={styles.name}>{name}</div>
				</div>
				<div className={styles.item2}>
					<span>项目介绍：</span>
					<div className={styles.name}>暂无</div>
				</div>
			</IceContainer>
			<Tab defaultActiveKey="db">
        		{rendTab()}
      		</Tab>
    	</div>
	);
}

export default withRouter(ProjectData);