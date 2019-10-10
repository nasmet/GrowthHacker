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
import userPortraitConfig from './userPortraitConfig';

const {
	Item
} = Tab;

export default function UserPortrait() {
	const renderTab = () => {
		return userPortraitConfig.map((item) => {
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
		<Components.Wrap>
			<Components.Title title='用户画像' />
			<Tab defaultActiveKey="aa">
	      		{renderTab()}
	      	</Tab>
     	</Components.Wrap>
	);
}