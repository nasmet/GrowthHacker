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
}) {
	const projectId = sessionStorage.getItem('projectId');
	let cancelTask = false;
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);

	function getUserShare() {
		setLoading(true);
		api.getUserShare({
			projectId,
			type,
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			console.log(res);
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});
	}

	useEffect(() => {

		return () => {
			cancelTask = true;
		}
	}, []);

	return (
		<div className={styles.content}>
			<Table loading={false} dataSource={tableData} hasBorder={false}>
				<Column title='城市' dataIndex='city' />
				<Column title='分享人数' dataIndex='shareNum' />
				<Column title='分享次数' dataIndex='shareCount' />
				<Column title='回流量' dataIndex='flow' />
				<Column title='回流量占比' dataIndex='shareRate' />
				<Column title='分享新增' dataIndex='shareAddition' />
			</Table>
		</div>
	);
}