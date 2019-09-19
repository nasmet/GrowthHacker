import React, {
	Component,
	useState,
	useEffect,
	useRef,
	useContext,
	useCallback,
	useMemo,
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
	DatePicker,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import moment from 'moment';
import styles from './index.module.scss';
import Filter from './components/Filter';
import * as retentionAnalysisConfig from './retentionAnalysisConfig';

moment.locale('zh-cn');
const {
	RangePicker,
} = DatePicker;
const {
	Column,
} = Table;
const limit = 10;

export default function RetentionAnalysis() {
	const [showDatePopup, setShowDatePopup] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [titles, setTitles] = useState([]);

	const filterChange = (e) => {
		console.log(e);
	};

	const onDateChange = () => {

	};

	const onVisibleChange = (e) => {
		setShowDatePopup(e);
	};

	const handleOtherDate = (e) => {
		console.log(e);
		setShowDatePopup(false);
	};

	const footerRender = () => {
		return (
			<div className={styles.footer}>
				{retentionAnalysisConfig.otherDates.map((item)=>
					<span
						className={styles.item} 
						key={item.id} 
						status="default"
						onClick={handleOtherDate.bind(this,item.id)}
					>
						{item.name}
					</span>
				)}
		    </div>
		);
	};


	const renderTitle = () => {
		return titles.map((item, index) => {
			const {
				id,
				name,
				key,
			} = item;
			return <Column key={id} title={name} dataIndex={index.toString()} />
		})
	};

	return (
		<div>
      		<Filter filterChange={filterChange} />
      		<div className={styles.item}>
      			<RangePicker 
      				defaultValue={[moment(),moment()]}
      				onChange={onDateChange}
      				footerRender={footerRender}
      				visible={showDatePopup}
      				onVisibleChange={onVisibleChange}
      			/>
      		</div>
      		<Table loading={loading} dataSource={data} hasBorder={false}>
			    {renderTitle()}       		
			</Table>
    	</div>
	);
}