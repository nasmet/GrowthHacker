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

	const renderSecondColumn = (value, index, record)=> {
		return <span className={styles.openId}>{record.wechat_openid}</span>
	};

	return (
		<div className={styles.userShareItem}>
			<p style={{paddingLeft:'4px'}}>{name}</p>
			<div className={styles.userShareItemChart}>
				<Table 
					loading={loading} 
					dataSource={tableData} 
					hasBorder={false}
					maxBodyHeight={260}
					fixedHeader
				>
					<Table.Column style={{background: 'transparent'}} className={styles.column} title='Top排名' width={80} dataIndex='ranking_num' />
					<Table.Column style={{background: 'transparent'}} className={styles.column} title='openId' cell={renderSecondColumn} dataIndex='wechat_openid' />
					<Table.Column style={{background: 'transparent'}} className={styles.column} title={title} width={80} dataIndex='count' />
				</Table>
			</div>
		</div>
	);
}

export default forwardRef(Top);