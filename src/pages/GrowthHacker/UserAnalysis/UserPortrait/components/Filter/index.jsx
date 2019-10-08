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
import {
	dateTypes,
} from './filterConfig';

moment.locale('zh-cn');
const {
	RangePicker,
} = DatePicker;
const {
	Item,
} = Tab;

export default function Filter({
	filterChange,
}) {
	const [dateValue, setDateValue] = useState([]);
	const [curDateValue, setCurDateValue] = useState([moment(), moment()]);
	const [tabValue, setTabValue] = useState('0');

	useEffect(() => {
		setDateValue(curDateValue);
	}, [curDateValue]);

	const renderDateTab = () => {
		return dateTypes.map((item) => {
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


	const getDate = (num = 1) => {
		return Date.now() - 24 * 60 * 60 * 1000 * num;
	}

	const dateTabChange = (e) => {
		let startDate = Date.now(),
			endDate = Date.now();

		switch (e) {
			case '0':
				break;
			case '1':
				startDate = endDate = getDate();
				break;
			case '7':
				startDate = getDate(7);
				endDate = getDate();
				break;
			case '30':
				startDate = getDate(30);
				endDate = getDate();
				break;
		}
		setTabValue(e);
		setCurDateValue([moment(startDate), moment(endDate)]);
		filterChange(`day:${e}`);
	};

	const onDateChange = (e) => {
		setDateValue(e);
	};

	const onOk = (e) => {
		setTabValue('NaN');
		setCurDateValue(e);
		filterChange(`abs:${e[0].valueOf()},${e[1].valueOf()}`);
	};

	const onVisibleChange = (e) => {
		if (!e) {
			setDateValue(curDateValue);
		}
	}

	return (
		<div className={styles.item}>
  			<RangePicker 
  				onChange={onDateChange}
  				value={dateValue}
  				onOk={onOk}
  				disabledDate={model.disabledDate}
  				onVisibleChange={onVisibleChange}
  			/>
  			<Tab 
  				className={styles.tabWrap}
  				activeKey={tabValue} 
  				shape="capsule" 
  				size="small" 
  				onChange={dateTabChange}
  			>
	      		{renderDateTab()}
	      	</Tab>
	    </div>
	);
}