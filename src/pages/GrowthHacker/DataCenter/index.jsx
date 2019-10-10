import React, {
	Component,
	useState,
	useEffect
} from 'react';
import {
	Input,
	Button,
	Table,
	Message,
	Loading,
	Pagination,
	Dialog,
	Tab,
} from '@alifd/next';
import {
	withRouter
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import dataCenterConfig from './dataCenterConfig';

const {
	Item,
} = Tab;

export default function DataCenter() {
	const renderTab = () => {
		return dataCenterConfig.map((item) => {
			const {
				key,
				tab,
				Component,
			} = item;
			return (
				<Item key={key} title={tab} >
          			<Component />
        		</Item>
			);
		});
	};

	return (
		<Components.Wrap>
			<Tab defaultActiveKey="bp">
	      		{renderTab()}
	      	</Tab>
		</Components.Wrap>
	);
}