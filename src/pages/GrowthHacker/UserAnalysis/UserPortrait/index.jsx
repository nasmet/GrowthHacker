import React from 'react';
import {
	Tab,
} from '@alifd/next';
import {
	tabs,
} from './config';

export default function UserPortrait() {
	const renderTab = () => {
		return tabs.map((item) => {
			const {
				key,
				tab,
				init,
				Component,
			} = item;
			return (
				<Tab.Item key={key} title={tab} >
        			<Component {...init} request={setRequest(key)} />
        		</Tab.Item>
			);
		});
	};

	function setRequest(key) {
		switch (key) {
			case 'aa':
				return api.getPortraitArea;
			case 'ma':
				return api.getPortraitModel;
			case 'ta':
				return api.getPortraitTerminal;
		}
	}

	return (
		<Components.Wrap>
			<Components.Title title='用户画像' />
			<Tab defaultActiveKey="aa">
	      		{renderTab()}
	      	</Tab>
     	</Components.Wrap>
	);
}