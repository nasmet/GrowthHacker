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
import Filter from '../Filter';

const {
	Item,
} = Tab;

function UserShare() {
	const renderTab = () => {
		return tabs.map((item) => {
			const Content = item.component;
			return (
				<Item key={item.key} title={item.tab} >
          			<div className={styles.marginTop10}>
            			<Content type={item.key} />
          			</div>
        		</Item>
			);
		});
	};

	const filterChange = (e) => {
		console.log(e);
	};

	return (
		<div className={styles.wrap}>
			<Filter filterChange={filterChange} />
			<Tab defaultActiveKey="us">
	    		{renderTab()}
	  		</Tab>
    	</div>
	);
}

export default withRouter(UserShare);