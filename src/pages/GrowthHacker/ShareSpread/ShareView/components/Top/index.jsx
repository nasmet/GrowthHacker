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

export default function Top({
	request,
	title,
	date,
	name,
}) {
	const projectId = sessionStorage.getItem('projectId');
	let cancelTask = false;
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		setLoading(true);
		request({
			projectId,
			trend: {
				date,
			}
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			setTableData(res.users);
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});
	}, [date]);

	return (
		<div className={styles.userShareItem}>
			<p style={{paddingLeft:'20px'}}>{name}</p>
			<div className={styles.userShareItemChart}>
				<Table loading={loading} dataSource={tableData} hasBorder={false} >
					<Column style={{background: 'transparent'}} className={styles.column} title='Top排名' dataIndex='ranking_num' />
					<Column style={{background: 'transparent'}} className={styles.column} title='头像' dataIndex='avatar' />
					<Column style={{background: 'transparent'}} className={styles.column} title='昵称' dataIndex='name' />
					<Column style={{background: 'transparent'}} className={styles.column} title={title} dataIndex='count' />
				</Table>
			</div>
		</div>
	);
}