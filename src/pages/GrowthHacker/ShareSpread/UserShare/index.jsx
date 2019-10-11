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
import {
	tabs,
} from './userShareConfig';

function UserShare() {
	const [date, setDate] = useState('day:0');

	const renderTab = () => {
		return tabs.map((item) => {
			const Content = item.component;
			return (
				<Tab.Item key={item.key} title={item.tab} >
          			<div className={styles.marginTop10}>
            			<Content type={item.key} date={date} />
          			</div>
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

export default withRouter(UserShare);