import React from 'react';
import {
	Tab,
} from '@alifd/next';
import userPortraitConfig from './userPortraitConfig';

export default function UserPortrait() {
	const renderTab = () => {
		return userPortraitConfig.map((item) => {
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
			<Components.Title title='用户画像' />
			<Tab defaultActiveKey="aa">
	      		{renderTab()}
	      	</Tab>
     	</Components.Wrap>
	);
}