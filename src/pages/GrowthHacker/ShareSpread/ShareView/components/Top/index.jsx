import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from 'react';
import {
	Table,
} from '@alifd/next';
import styles from './index.module.scss';

function Top({
	request,
	title,
	date,
	name,
}, ref) {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);

	useImperativeHandle(ref, () => ({
		update: (e) => {
			getTop(e);
		},
	}));

	function getTop(date) {
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
	}

	useEffect(() => {
		getTop(date);

		return () => {
			api.cancelRequest();
		}
	}, []);

	return (
		<div className={styles.userShareItem}>
			<p style={{paddingLeft:'20px'}}>{name}</p>
			<div className={styles.userShareItemChart}>
				<Table 
					loading={loading} 
					dataSource={tableData} 
					hasBorder={false}
					maxBodyHeight={260}
					fixedHeader
				>
					<Table.Column style={{background: 'transparent'}} className={styles.column} title='Top排名' dataIndex='ranking_num' />
					<Table.Column style={{background: 'transparent'}} className={styles.column} title='openId' dataIndex='wechat_openid' />
					<Table.Column style={{background: 'transparent'}} className={styles.column} title={title} dataIndex='count' />
				</Table>
			</div>
		</div>
	);
}

export default forwardRef(Top);