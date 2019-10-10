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
import Header from '../Header';

const {
	Column,
} = Table;

export default function ShareTrend() {
	const projectId = sessionStorage.getItem('projectId');
	let cancelTask = false;

	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [titles, setTitles] = useState([]);
	const [date, setDate] = useState('day:0');
	const [curPage, setCurPage] = useState(1);
	const [count, setCount] = useState(0);
	const [chartData, setChartData] = useState([]);
	const chartStyle = {
		x: 'time',
		y: 'count',
		color: 'event',
	};

	useEffect(() => {
		function getShareTrend() {
			setLoading(true);
			api.getShareTrend({
				projectId,
				trend: {
					date,
					limit: config.LIMIT,
					offset: (curPage - 1) * config.LIMIT,
				}
			}).then((res) => {
				if (cancelTask) {
					return;
				}
				const {
					share_overview,
					total,
				} = res;
				setTableData(share_overview);
				setCount(total);
				setChartData(assembleChartData(share_overview));
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				if (cancelTask) {
					return;
				}
				setLoading(false);
			});
		}

		getShareTrend();

		return () => {
			cancelTask = true;
		};
	}, [date, curPage]);

	function assembleChartData(arg) {
		const temp = [];
		arg.map((item) => {
			const {
				new_count,
				share_count,
				share_open_count,
				share_reflux_ratio,
				share_user_count,
				time_range
			} = item;
			const time = formatTime(time_range);
			temp.push({
				time,
				event: '分享人数',
				count: share_user_count,
			});
			temp.push({
				time,
				event: '分享次数',
				count: share_count,
			});
			temp.push({
				time,
				event: '回流量',
				count: share_open_count,
			});
			temp.push({
				time,
				event: '分享回流比',
				count: share_reflux_ratio,
			});
			temp.push({
				time,
				event: '分享新增',
				count: new_count,
			});
		});
		return temp;
	}

	const filterChange = (e) => {
		setDate(e);
	};

	const renderTitles = () => {
		return titles.map((item, index) => {
			return (
				<Column key={index} title={item} dataIndex={index.toString()} />
			);
		});
	};

	const pageChange = (e) => {
		setCurPage(e);
	};

	const renderFirstColumn = (value, index, record) => {
		return <span>{formatTime(record.time_range)}</span>;
	};

	function formatTime(arg) {
		const start = arg.from;
		const end = arg.to;
		if (end - start > 3600) {
			return `日期:${utils.formatUnix(start, 'Y-M-D')}`;
		}
		const formatStart = utils.formatUnix(start, 'h:m');
		const formatEnd = utils.formatUnix(end, 'h:m');
		return `${formatStart}-${formatEnd}`;
	}

	const renderFiveColumn = (value, index, record) => {
		const temp = (record.share_reflux_ratio * 100).toFixed(2);
		return `${temp}%`;
	};

	return (
		<Components.Wrap>
			<Components.Title title='分享趋势' />
			<Components.DateFilter filterChange={filterChange} />
			<div style={{background:'#fff'}}>
				<Header date={date} />
				<Components.BasicColumn data={chartData} {...chartStyle} forceFit />
			</div>
			<IceContainer>
				<Table 
					loading={loading} 
					dataSource={tableData} 
					hasBorder={false}
				>
					<Column title='日期' cell={renderFirstColumn} />
					<Column title='分享人数' dataIndex='share_user_count' />
					<Column title='分享次数' dataIndex='share_count' />
					<Column title='回流量' dataIndex='share_open_count' />
					<Column title='分享回流比' cell={renderFiveColumn} />
					<Column title='分享新增' dataIndex='new_count' />
				</Table>

	          	<Pagination
	           		className={styles.pagination}
	            	current={curPage}
	            	total={count}
	            	onChange={pageChange}
	          	/>
			</IceContainer>
    	</Components.Wrap>
	);
}