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

export default function UserShare({
	type,
	date,
}) {
	const projectId = sessionStorage.getItem('projectId');
	let cancelTask = false;
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);

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

	return (
		<div className={styles.content}>
			<Table loading={false} dataSource={tableData} hasBorder={false} >
				<Column title='用户' dataIndex='wechat_openid' />
				<Column title='分享次数' dataIndex='share_count' />
				<Column title='回流量' dataIndex='share_open_count' />
				<Column title='分享回流比' dataIndex='share_reflux_ratio' />
				<Column title='分享新增' dataIndex='new_count' />
			</Table>
		</div>
	);
}