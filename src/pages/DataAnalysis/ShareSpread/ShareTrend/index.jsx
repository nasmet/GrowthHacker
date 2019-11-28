import React, {
	useRef,
	useMemo,
	useState,
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
	const headRef = useRef(null);
	const chartStyle = {
		x: 'time',
		y: 'count',
		color: 'event',
	};

	const [curPage, setCurPage] = useState(1);
	const limit = 23;

	const {
		response,
		loading,
		updateParameter,
		parameter,
	} = hooks.useRequest(api.getShareTrend, {
		date: 'day:0',
		limit,
		offset: 0,
	});
	const {
		share_overview = [],
			total = 0,
	} = response;

	const assembleChartData = useMemo(() => {
		const temp = [];
		share_overview.forEach((item) => {
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
				count: utils.transformPercent(share_reflux_ratio),
			});
			temp.push({
				time,
				event: '分享新增',
				count: new_count,
			});
		});
		return temp;
	}, [share_overview]);

	const assembleCols = useMemo(() => {
		if (share_overview.length === 0) {
			return {};
		}
		const time_range = share_overview[0].time_range;
		const start = time_range.from;
		const end = time_range.to;
		if (end - start > 3600) {
			return {
				time: {
					type: 'timeCat',
				},
			};
		}
		return {};
	}, [share_overview]);

	const dateChange = date => {
		updateParameter({ ...parameter,
			date,
			offset: 0,
		})
		headRef.current.update(date);
		setCurPage(1);
	};

	const pageChange = e => {
		updateParameter({ ...parameter,
			offset: (e - 1) * limit,
		});
		setCurPage(e);
	};

	const renderFirstColumn = (value, index, record) => {
		return <span>{formatTime(record.time_range)}</span>;
	};

	function formatTime(time_range) {
		const start = time_range.from;
		const end = time_range.to;
		if (end - start > 3600) {
			return utils.formatUnix(start, 'Y-M-D');
		}
		const formatStart = utils.formatUnix(start, 'h:m');
		const formatEnd = utils.formatUnix(end, 'h:m');
		return `${formatStart}-${formatEnd}`;
	}

	const renderFiveColumn = (value, index, record) => {
		return `${utils.transformPercent(record.share_reflux_ratio)}`;
	};

	const onRefresh = () => {
		updateParameter(parameter);
	};


	const handleData = () => {
		return {
			sheetHeader: ['日期', '分享人数', '分享次数', '回流量', '分享回流比', '分享新增'],
			sheetData: share_overview.map(item => {
				return {
					...item,
					time_range: formatTime(item.time_range),
				};
			}),
		};
	};

	return (
		<Components.Wrap>
			<Components.Title title='分享趋势' />
			<Components.DateFilter filterChange={dateChange} />
			<IceContainer>
				<Header ref={headRef} />
				<Loading visible={loading} inline={false}>
					<Components.BasicPolyline data={assembleChartData} {...chartStyle}  forceFit />
					<div className='table-update-btns'>					
						<Components.Refresh onClick={onRefresh} />
						{share_overview.length > 0 && <Components.ExportExcel fileName='分享趋势' handle={handleData} />}
					</div>
					<Table 
						dataSource={share_overview} 
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
					current={curPage}
					pageSize={limit}
					total={total}
					onChange={pageChange}
				/>
			</IceContainer>
		</Components.Wrap>
	);
}