import React, {
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Table,
	Loading,
	Pagination,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Header from '../Header';

export default function ShareTrend() {
	const refVarible = useRef({
		date: 'day:0',
		curPage: 1,
	});
	const headRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [count, setCount] = useState(0);
	const [chartData, setChartData] = useState([]);
	const chartStyle = {
		x: 'time',
		y: 'count',
		color: 'event',
	};

	function assembleChartData(arg) {
		const temp = [];
		arg.map((item) => {
			const {
				new_count,
				share_count,
				share_open_count,
				share_reflux_ratio,
				share_user_count,
				time_range,
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

	function getShareTrend() {
		setLoading(true);
		api.getShareTrend({
			date: refVarible.current.date,
			limit: config.LIMIT,
			offset: (refVarible.current.curPage - 1) * config.LIMIT,
		}).then((res) => {
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
			setLoading(false);
		});
	}

	useEffect(() => {

		getShareTrend();

		return () => {
			api.cancelRequest();
		};
	}, []);
	const filterChange = (e) => {
		refVarible.current.date = e;
		getShareTrend();
		headRef.current.update(e);
	};

	const pageChange = (e) => {
		refVarible.current.curPage = e;
		getShareTrend();
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
		return `${utils.transformPercent(record.share_reflux_ratio)}`;
	};

	return (
		<Components.Wrap>
			<Components.Title title='分享趋势' />
			<Components.DateFilter filterChange={filterChange} />
			<IceContainer>
				<Header date={refVarible.current.date} ref={headRef} />
				<Loading visible={loading} inline={false}>
					<Components.BasicColumn data={chartData} {...chartStyle} forceFit />
					<Table 
						dataSource={tableData} 
						hasBorder={false}
					>
						<Table.Column title='日期' cell={renderFirstColumn} />
						<Table.Column title='分享人数' dataIndex='share_user_count' />
						<Table.Column title='分享次数' dataIndex='share_count' />
						<Table.Column title='回流量' dataIndex='share_open_count' />
						<Table.Column title='分享回流比' cell={renderFiveColumn} />
						<Table.Column title='分享新增' dataIndex='new_count' />
					</Table>
				</Loading>
				<Pagination
					className={styles.pagination}
					total={count}
					onChange={pageChange}
				/>
			</IceContainer>
		</Components.Wrap>
	);
}