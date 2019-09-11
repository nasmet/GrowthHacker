import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Message,
	Loading,
	DatePicker,
	Tab,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import moment from 'moment';
import styles from './index.module.scss';
import eventAnalysisConfig from './eventAnalysisConfig';

moment.locale('zh-cn');
const {
	RangePicker,
} = DatePicker;
const {
	Item,
} = Tab;

function EventAnalysis({
	location,
}) {
	const cols = {
		value: {
			alias: '广告',
		}
	};
	const arr = decodeURIComponent(location.search).split(/\?|\=/);
	const ids = arr[2].split(',');
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [chartType, setChartType] = useState('1');

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
	};

	const renderTab = () => {
		return eventAnalysisConfig.map((item) => {
			return (
				<Item 
					key={item.key}
          			title={item.name}
        		/>
			);
		});
	};

	const tabChange = (e) => {
		setChartType(e);
	};

	const rendChart = () => {
		switch (chartType) {
			case '1':
				return <Components.BasicPolyline data={data} forceFit cols={cols} />
			case '2':
				return <Components.BasicColumn data={data} forceFit cols={cols} />
			case '3':
				return <Components.BasicColumn data={data} forceFit cols={cols} transpose />
			default:
				return <Components.BasicPolyline data={data} forceFit cols={cols} />
		};

	};

	return (
		<div>
      		<div className={styles.item}>
      			<span className={styles.name}>名称：</span>
      			{
      				ids.map((item, index)=>{
      					return <span key={index} className={styles.value}>{item}</span>
      				})
      			}
      		</div>
      		<div className={styles.item}>
      			<span className={styles.name}>统计趋势：</span>
      			<RangePicker 
      				defaultValue={[moment(),moment()]}
      				onChange={onDateChange}
      			/>
      			<Tab 
      				className={styles.tabWrap}
      				defaultActiveKey="1" 
      				shape="capsule" 
      				size="small" 
      				onChange={tabChange}
      			>
		      		{renderTab()}
		      	</Tab>
      		</div>
      		<Loading visible={loading} inline={false}>
      			{rendChart()}
      		</Loading>
    	</div>
	);
}

export default withRouter(EventAnalysis);