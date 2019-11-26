import React, {
	forwardRef,
	useImperativeHandle,
} from 'react';
import {
	Loading,
} from '@alifd/next';
import styles from './index.module.scss';

function Header({
	date = 'day:0',
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
	} = hooks.useRequest(api.getShareHeader, {
		date,
	});
	const {
		new_count = 0,
			share_count = 0,
			share_open_count = 0,
			share_reflux_ratio = 0,
			share_user_count = 0,
	} = response;

	const renderItem = (name, value) => {
		return (
			<div className={styles.item}>
				<span className={styles.value}>{value}</span>
				<span>{name}</span>
			</div>		
		);
	}

	return (
		<Loading visible={loading} inline={false}>
			<div className={styles.list}>
				{renderItem('分享人数',share_user_count)}
				{renderItem('分享次数',share_count)}
				{renderItem('回流量',share_open_count)}
				{renderItem('分享回流比',utils.transformPercent(share_reflux_ratio))}
				{renderItem('分享新增',new_count)}
			</div>
		</Loading>
	);
}

export default forwardRef(Header);