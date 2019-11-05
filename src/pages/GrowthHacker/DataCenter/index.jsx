import React from 'react';
import {
	Tab,
} from '@alifd/next';
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
			<Tab defaultActiveKey='event'>
				{renderTab()}
			</Tab>
		</Components.Wrap>
	);
}