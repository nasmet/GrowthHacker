import React, {
	Component,
} from 'react';
import {
	Tab,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import dataCenterConfig from './dataCenterConfig';

export default function DataCenter() {
	const renderTab = () => {
		return dataCenterConfig.map((item) => {
			const {
				key,
				tab,
				Component,
			} = item;
			return (
				<Tab.Item key={key} title={tab} >
          			<Component />
        		</Tab.Item>
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