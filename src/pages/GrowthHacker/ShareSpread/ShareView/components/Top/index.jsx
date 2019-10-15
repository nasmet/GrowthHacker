import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Table,
} from '@alifd/next';
import Img from '@icedesign/img';
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

		return () => {
			api.cancelRequest();
		};
	}, [date]);

	const renderTwoColumn = (value, index, record) => {
		return record.avatar ?
			<Img width={30} height={30} src={record.avatar} enableAliCDNSuffix={true} shape='circle' /> :
			<span>暂无头像</span>
	};

	return (
		<div className={styles.userShareItem}>
			<p style={{paddingLeft:'20px'}}>{name}</p>
			<div className={styles.userShareItemChart}>
				<Table loading={loading} dataSource={tableData} hasBorder={false} >
					<Table.Column style={{background: 'transparent'}} className={styles.column} title='Top排名' dataIndex='ranking_num' />
					<Table.Column style={{background: 'transparent'}} className={styles.column} title='头像' cell={renderTwoColumn} />
					<Table.Column style={{background: 'transparent'}} className={styles.column} title='昵称' dataIndex='name' />
					<Table.Column style={{background: 'transparent'}} className={styles.column} title={title} dataIndex='count' />
				</Table>
			</div>
		</div>
	);
}