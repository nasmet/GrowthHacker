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

export default function CityDistribute({
	type,
	date,
}) {
	const chartStyle = {
		x: 'city',
		y: 'count',
		color: 'event',
	};

	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [curPage, setCurPage] = useState(1);
	const [count, setCount] = useState(0);

	useEffect(() => {
		function getUserShare() {
			setLoading(true);
			api.getUserShare({
				tab: type,
				date,
				limit: config.LIMIT,
				offset: (curPage - 1) * config.LIMIT,
			}).then((res) => {
				setChartData(assembleChartData(res.data));
				setCount(res.total);
				setTableData(res.data);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}

		getUserShare();
	}, [date, curPage]);

	function assembleChartData(arg) {
		const temp = [];
		arg.map((item) => {
			const {
				city,
				new_count,
				share_count,
				share_open_count,
				share_reflux_ratio,
				share_user_count,
			} = item;
			temp.push({
				city,
				event: '分享人数',
				count: share_user_count,
			});
			temp.push({
				city,
				event: '分享次数',
				count: share_count,
			});
			temp.push({
				city,
				event: '回流量',
				count: share_open_count,
			});
			temp.push({
				city,
				event: '分享回流比',
				count: share_reflux_ratio,
			});
			temp.push({
				city,
				event: '分享新增',
				count: new_count,
			});
		});
		return temp;
	}

	const pageChange = (e) => {
		setCurPage(e);
	};

	const renderFiveColumn = (value, index, record) => {
		return `${utils.transformPercent(record.share_reflux_ratio)}`;
	};

	return (
		<div className={styles.content}>
			<div style={{background:'#fff'}}>
				<Components.BasicColumn data={chartData} {...chartStyle} forceFit />
			</div>
			<IceContainer>
				<Loading visible={loading} inline={false}>
					<Table dataSource={tableData} hasBorder={false}>
						<Table.Column title='城市' dataIndex='city' />
						<Table.Column title='分享人数' dataIndex='share_user_count' />
						<Table.Column title='分享次数' dataIndex='share_count' />
						<Table.Column title='回流量' dataIndex='share_open_count' />
						<Table.Column title='回流量占比' cell={renderFiveColumn} />
						<Table.Column title='分享新增' dataIndex='new_count' />
					</Table>
				</Loading>
			    <Pagination
	           		className={styles.pagination}
	            	current={curPage}
	            	total={count}
	            	onChange={pageChange}
	          	/>
          	</IceContainer>
		</div>
	);
}