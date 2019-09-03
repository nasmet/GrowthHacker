import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Message,
	Loading,
	DatePicker,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import moment from 'moment';
import styles from './index.module.scss';

moment.locale('zh-cn');

const {
	RangePicker,
} = DatePicker;

function EventAnalysis({
	location,
}) {
	const arr = location.search.split('?');
	const {
		name,
		event,
		type,
	} = JSON.parse(decodeURIComponent(arr[1]));
	
	const cols = {
		value: {
			alias: name,
		}
	};

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	let cancelTask = false;

	function getData() {
		setLoading(true);
		api.getEventAnalysis().then((res) => {
			if (cancelTask) {
				return;
			}
			setData(res.list);
		}).catch((e) => {
			console.error(e);
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});
	}

	useEffect(() => {
		getData();

		return () => {
			cancelTask = true;
		};
	}, []);

	const onDateChange = (e) => {
		if (e.length === 2 && e[1]) {
			getData();
		}
		// console.log(utils.dateMap(e[0]._d));
	};

	return (
		<div>
      		<div className={styles.item}>
      			<span className={styles.name}>名称：</span>
      			<span>{name}</span>
      		</div>
      		<div className={styles.item}>
      			<span className={styles.name}>事件名：</span>
      			<span>{event}</span>
      		</div>
      		<div className={styles.item}>
      			<span className={styles.name}>类型：</span>
      			<span>{type}</span>
      		</div>
      		<div className={styles.item}>
      			<span className={styles.name}>统计趋势：</span>
      			<RangePicker 
      				defaultValue={[moment(),moment()]}
      				onChange={onDateChange}
      				popupTriggerType="hover"
      			/>
      		</div>
      		<Loading visible={loading}>
      			<Components.BasicPolyline data={data} forceFit cols={cols} />
      		</Loading>
    	</div>
	);
}

export default withRouter(EventAnalysis);