import React, {
	useState,
} from 'react';
import {
	Tab,
} from '@alifd/next';
import {
	tabs,
} from './config';

export default function UserShare() {
	const [date, setDate] = useState('day:0');

	const renderTab = () => {
		return tabs.map((item) => {
			const {
				Component,
				key,
				tab,
			} = item;
			return (
				<Tab.Item key={key} title={tab} >
          			<Component type={item.key} date={date} />
        		</Tab.Item>
			);
		});
	};

	const filterChange = (e) => {
		setDate(e);
	};

	return (
		<Components.Wrap>
			<Components.Title title='用户分享' />
			<Components.DateFilter filterChange={filterChange} />
			<Tab defaultActiveKey="user">
	    		{renderTab()}
	  		</Tab>
    	</Components.Wrap>
	);
}