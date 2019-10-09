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

const {
	Column,
} = Table;

export default function CityDistribute({
	type,
	date,
}) {
	const projectId = sessionStorage.getItem('projectId');
	let cancelTask = false;
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [chartData, setChartData] = useState([]);
	const chartStyle = {
		x: 'city',
		y: 'count',
		color: 'event',
	};

	useEffect(() => {
		function getUserShare() {
			setLoading(true);
			api.getUserShare({
				projectId,
				trend: {
					tab: type,
					date,
				}
			}).then((res) => {
				if (cancelTask) {
					return;
				}
				setChartData(assembleChartData(res.data));
				setTableData(res.data);
			}).catch((e) => {
				Message.success(e.toString());
			}).finally(() => {
				if (cancelTask) {
					return;
				}
				setLoading(false);
			});
		}

		getUserShare();

		return () => {
			cancelTask = true;
		}
	}, [date]);

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

	return (
		<div className={styles.content}>
			<div style={{background:'#fff'}}>
				<Components.BasicColumn data={chartData} {...chartStyle} forceFit />
			</div>
			<Table loading={false} dataSource={tableData} hasBorder={false}>
				<Column title='城市' dataIndex='city' />
				<Column title='分享人数' dataIndex='share_user_count' />
				<Column title='分享次数' dataIndex='share_count' />
				<Column title='回流量' dataIndex='share_open_count' />
				<Column title='回流量占比' dataIndex='share_reflux_ratio' />
				<Column title='分享新增' dataIndex='new_count' />
			</Table>
		</div>
	);
}