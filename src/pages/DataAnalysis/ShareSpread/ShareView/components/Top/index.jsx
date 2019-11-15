import React, {
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
	useImperativeHandle(ref, () => ({
		update: date => {
			updateParameter({ ...parameter,
				date,
			});
		},
	}));

	const {
		response,
		loading,
		updateParameter,
		parameter,
	} = hooks.useRequest(request, {
		date,
	});

	const {
		users = [],
	} = response;

	const renderSecondColumn = (value, index, record) => {
		return <span className={styles.openId}>{record.wechat_openid}</span>
	};

	return (
		<div className={styles.userShareItem}>
			<p style={{paddingLeft:'4px'}}>{name}</p>
			<div className={styles.userShareItemChart}>
				<Table 
					loading={loading} 
					dataSource={users} 
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