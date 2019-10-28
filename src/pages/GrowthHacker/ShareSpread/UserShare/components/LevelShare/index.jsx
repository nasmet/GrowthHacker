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

export default function LevelShare({
	type,
}) {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);

	function getUserShare() {
		setLoading(true);
		api.getUserShare({
			tab: type,
			date,
		}).then((res) => {
			console.log(res);
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		});
	}
	
	return (
		<div className={styles.content}>
			<IceContainer>
				<Table loading={false} dataSource={tableData} hasBorder={false}>
					<Table.Column title='层级' dataIndex='level' />
					<Table.Column title='分享人数' dataIndex='shareNum' />
					<Table.Column title='分享次数' dataIndex='shareCount' />
					<Table.Column title='回流量' dataIndex='flow' />
					<Table.Column title='回流量占比' dataIndex='shareRate' />
					<Table.Column title='分享新增' dataIndex='shareAddition' />
				</Table>
			</IceContainer>
		</div>
	);
}