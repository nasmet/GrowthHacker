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

export default function Top({
	request,
	title,
	date,
	name,
}) {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		setLoading(true);
		request({
			date,
		}).then((res) => {
			setTableData(res.users);
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		});
	}, [date]);

	return (
		<div className={styles.userShareItem}>
			<p style={{paddingLeft:'20px'}}>{name}</p>
			<div className={styles.userShareItemChart}>
				<Table loading={loading} dataSource={tableData} hasBorder={false} >
					<Table.Column style={{background: 'transparent'}} className={styles.column} title='Top排名' dataIndex='ranking_num' />
					<Table.Column style={{background: 'transparent'}} className={styles.column} title='头像' dataIndex='avatar' />
					<Table.Column style={{background: 'transparent'}} className={styles.column} title='昵称' dataIndex='name' />
					<Table.Column style={{background: 'transparent'}} className={styles.column} title={title} dataIndex='count' />
				</Table>
			</div>
		</div>
	);
}