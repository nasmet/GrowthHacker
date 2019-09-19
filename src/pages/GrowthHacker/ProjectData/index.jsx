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
	Grid,
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
const {
	Row,
	Col,
} = Grid;

function ProjectData({
	location,
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
		desc,
	} = projectInfo;

	const info = [{
		id: 0,
		name: '项目名称',
		value: name,
	}, {
		id: 1,
		name: '项目介绍',
		value: desc,
	}];

	const renderInfo = () => {
		return info.map((item) => {
			const {
				id,
				name,
				value,
			} = item;
			return (
				<div key={id} className={styles.item}>
					<span>{name}：</span>
					<span className={styles.name}>{value}</span>
				</div>
			)
		});
	};

	const renderTab = () => {
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
 				{renderInfo()}
			</IceContainer>
			<Tab defaultActiveKey="db">
        		{renderTab()}
      		</Tab>
    	</div>
	);
}

export default withRouter(ProjectData);