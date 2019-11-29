import React, {
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
	initCurDateValue = [moment(model.getStartDate()), moment(model.getEndDate())],
	showTime = true
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

	const dateTabChange = (e) => {
		let startDate;
		let endDate;
		switch (e) {
			case '0':
				startDate = model.getStartDate();
				endDate = model.getEndDate();
				break;
			case '1':
				startDate = model.getStartDate(1);
				endDate = model.getEndDate(1);
				break;
			case '7':
				startDate = model.getStartDate(6);
				endDate = model.getEndDate();
				break;
			case '14':
				startDate = model.getStartDate(13);
				endDate = model.getEndDate();
				break;
			case '30':
				startDate = model.getStartDate(29);
				endDate = model.getEndDate();
				break;
			default:
				startDate = model.getStartDate();
				endDate = model.getEndDate();
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
	  				hasClear={false}
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