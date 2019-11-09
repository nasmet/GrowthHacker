import React from 'react';
import {
	Tab,
} from '@alifd/next';
import {
	tabs,
} from './config';

export default function DataCenter() {
	const renderTab = () => {
		return tabs.map((item) => {
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