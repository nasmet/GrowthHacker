import React, {
	Component,
	useState,
	useEffect,
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
	Dialog,
	Select,
	Grid,
	DatePicker,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import DeviceInfo from './components/DeviceInfo';
import UserDetails from './components/UserDetails';
import {
	tabs,
} from './userScrutinyDetailsConfig';

const {
	Item
} = Tab;

function UserScrutinyDetails({
	location,
}) {
	const {
		id,
	} = location.state;
	const deviceInfo = [{
		name: '屏幕分辨率',
		value: '0*0',
	}, {
		name: '设备品牌',
		value: 'Apple',
	}, {
		name: '事件时间',
		value: '2019-09-25',
	}, {
		name: '终端',
		value: 'minigame',
	}, {
		name: '操作系统',
		value: 'Weixin 6.7.3',
	}];
	const userInfo = [];

	const renderTab = () => {
		return tabs.map((item) => {
			const {
				key,
				tab,
				Component,
			} = item;
			return (
				<Item key={key} title={tab} >
          			<div className={styles.marginTop10}>
            			<Component />
          			</div>
        		</Item>
			);
		});
	};

	return (
		<div className={styles.wrap}>
      		<div className={styles.leftContent}>
      			<Tab defaultActiveKey="aa">
		      		{renderTab()}
		      	</Tab>
      		</div>
      		<div className={styles.rightContent}>
      			<UserDetails userInfo={userInfo} />
      			<DeviceInfo deviceInfo={deviceInfo} />
      		</div>
    	</div>
	);
}

export default withRouter(UserScrutinyDetails);