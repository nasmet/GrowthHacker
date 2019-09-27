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
import moment from 'moment';
import styles from './index.module.scss';
import * as userShareConfig from './userShareConfig';

moment.locale('zh-cn');
const {
	RangePicker,
} = DatePicker;
const {
	Item,
} = Tab;

function UserShare() {
	const [dateValue, setDateValue] = useState([moment(), moment()]);
	const [tabValue, setTabValue] = useState('NaN');

	const renderDateTab = () => {
		return userShareConfig.dateTypes.map((item) => {
			const {
				name,
				key,
			} = item;
			return (
				<Item 
					key={key}
          			title={name}
        		/>
			);
		});
	};

	const renderTab = () => {
		return userShareConfig.tabs.map((item) => {
			const Content = item.component;
			return (
				<Item key={item.key} title={item.tab} >
          			<div className={styles.marginTop10}>
            			<Content />
          			</div>
        		</Item>
			);
		});
	};

	const getDate = (num = 1) => {
		return Date.now() - 24 * 60 * 60 * 1000 * num;
	}

	const tabChange = (e) => {
		let startDate = Date.now(),
			endDate = Date.now();

		switch (e) {
			case '0':
				break;
			case '1':
				startDate = endDate = getDate();
				break;
			case '2':
				startDate = getDate(7);
				endDate = getDate();
				break;
			case '3':
				startDate = getDate(30);
				endDate = getDate();
				break;
		}
		setTabValue(e);
		setDateValue([moment(startDate), moment(endDate)]);
	};

	const onDateChange = (e) => {
		setDateValue(e);
		if (e.length === 2 && e[1]) {
			setTabValue('NaN');
		}
	};

	return (
		<div className={styles.wrap}>
      		<div className={styles.item}>
      			<RangePicker 
      				onChange={onDateChange}
      				value={dateValue}
      			/>
      			<Tab 
      				className={styles.tabWrap}
      				activeKey={tabValue} 
      				shape="capsule" 
      				size="small" 
      				onChange={tabChange}
      			>
		      		{renderDateTab()}
		      	</Tab>
	      	</div>
      		<div>
				<Tab defaultActiveKey="us">
		    		{renderTab()}
		  		</Tab>
	  		</div>
    	</div>
	);
}

export default withRouter(UserShare);