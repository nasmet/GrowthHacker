import React, {
	useEffect,
} from 'react';
import {
	Tab,
} from '@alifd/next';
import dataCenterConfig from './dataCenterConfig';

export default function DataCenter() {
	let key = '';
	const cache = sessionStorage.getItem('DataCenter');
	key = cache ? cache : "event";

	useEffect(() => {

		return () => {
			sessionStorage.setItem('DataCenter', key);
		};
	}, []);

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

	const onChange = (e) => {
		key = e;
	}

	return (
		<Components.Wrap>
			<Tab defaultActiveKey={key} onChange={onChange}>
				{renderTab()}
			</Tab>
		</Components.Wrap>
	);
}