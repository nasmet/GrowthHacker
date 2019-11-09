import React from 'react';
import {
	Table,
	Loading,
	Pagination,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function Template({
	openId,
	tab,
}) {
	const {
		response,
		loading,
		updateParameter,
		parameter,
	} = hooks.useRequest(api.getUserScrutinyEvents, {
		openId,
		trend: {
			tab,
			limit: config.LIMIT,
			offset: 0,
		},
	});
	const {
		total = 0,
			events = [],
	} = response;

	const pageChange = (e) => {
		parameter.trend.offset=(e-1)*config.LIMIT;
		updateParameter({...parameter});
	};

	const renderTimeColumn = (value, index, record) => {
		const val = record.created_at || '';
		return <span>{utils.formatUnix(val,'Y-M-D h:m:s')}</span>
	};

	return (
		<IceContainer>
			<Loading visible={loading} inline={false}>
	      		<Table 
					dataSource={events} 
					hasBorder={false}
				>
					<Table.Column title='事件名称' dataIndex='name' />
					<Table.Column title='事件标识符' dataIndex='event' />
					<Table.Column title='事件时间' cell={renderTimeColumn} />
				</Table>
			</Loading>
		 	<Pagination
            	className={styles.pagination}
            	total={total}
            	onChange={pageChange}
		    />
    	</IceContainer>
	);
}