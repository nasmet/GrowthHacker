import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Tab,
	DatePicker,
} from '@alifd/next';
import moment from 'moment';
import styles from './index.module.scss';
import {
	dateTypes,
} from './config';

export default function DateFilter({
	filterChange,
	initTabValue = '0',
	initCurDateValue = [moment(), moment()],
	showTime = false
}) {
	const [dateValue, setDateValue] = useState([]);
	const [curDateValue, setCurDateValue] = useState(initCurDateValue);
	const [tabValue, setTabValue] = useState(initTabValue);

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
				<Tab.Item 
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
		filterChange(`abs:${parseInt(e[0].valueOf()/1000)},${parseInt(e[1].valueOf()/1000)}`);
	};

	const onVisibleChange = (e) => {
		if (!e) {
			setDateValue(curDateValue);
		}
	}

	return (
		<div className={styles.wrap}>
			<div>
	  			<DatePicker.RangePicker
	  				style={{width: showTime?'350px':'240px'}}	  				
	  				showTime={showTime} 
	  				onChange={onDateChange}
	  				value={dateValue}
	  				onOk={onOk}
	  				disabledDate={model.disabledDate}
	  				onVisibleChange={onVisibleChange}
	  			/>
  			</div>
  			<div className={styles.tabWrap}>
	  			<Tab 			
	  				activeKey={tabValue} 
	  				shape="capsule" 
	  				size="small" 
	  				onChange={dateTabChange}
	  			>
		      		{renderDateTab()}
		      	</Tab>
	      	</div>
	    </div>
	);
}