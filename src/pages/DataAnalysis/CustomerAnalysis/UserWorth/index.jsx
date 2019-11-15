import React from 'react';
import {
	Table,
	Loading,
	Pagination,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function UserWorth() {
	const {
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getUserWorth, {
		seg_id: 0,
		limit: config.LIMIT,
		offset: 0,
	});
	const {
		ltvs = [],
			total = 0,
	} = response;

	const groupChange = e => {
		updateParameter({ ...parameter,
			seg_id: e,
			offset: 0,
		});
	};

	const pageChange = e => {
		updateParameter({ ...parameter,
			offset: (e - 1) * config.LIMIT,
		});
	};

	return (
		<Components.Wrap>
			<Components.Title title='单用户价值评估' />
			<IceContainer>
				<Components.GroupFilter filterChange={groupChange} />
				<Loading visible={loading} inline={false}>
					<Table dataSource={ltvs} hasBorder={false} >
						<Table.Column title='openId' dataIndex='wechat_openid' />
						<Table.Column title='广告点击次数' dataIndex='ads_watch_count' />
						<Table.Column title='分享新增用户数' dataIndex='new_user_count' />
						<Table.Column title='分享次数' dataIndex='share_count' />
						<Table.Column title='分享回流数' dataIndex='share_open_count' />
					</Table>
					<Pagination
						className={styles.pagination}	   													        		            	
						total={total}		            	
						onChange={pageChange}	            	
					/>	
				</Loading>
			</IceContainer>
		</Components.Wrap>
	);
}