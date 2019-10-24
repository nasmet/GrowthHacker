import React from 'react';
import {
	Tab,
} from '@alifd/next';
import {
	tabs,
} from './arpuConfig';

export default function ARPUAnalysis() {
	const renderTab = () => {
		return tabs.map((item) => {
			const {
				Component,
				key,
				tab,
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
			<Components.Title title='ARPU分析' desc='对玩家点击广告的行为归因' />
			<Tab defaultActiveKey="arpu">
				{renderTab()}	    		
			</Tab>	  		
		</Components.Wrap>    	
	);
}