import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Loading,
} from '@alifd/next';
import styles from './index.module.scss';

export default function Header({
	date,
}) {
	const [loading, setLoading] = useState(false);
	const [userCount, setUserCount] = useState(0);
	const [count, setCount] = useState(0);
	const [newCount, setNewCount] = useState(0);
	const [openCount, setOpenCount] = useState(0);
	const [rate, setRate] = useState(0);

	useEffect(() => {
		setLoading(true);
		api.getShareHeader({
			date,
		}).then((res) => {
			const {
				new_count,
				share_count,
				share_open_count,
				share_reflux_ratio,
				share_user_count,
			} = res;
			setNewCount(new_count);
			setCount(share_count);
			setOpenCount(share_open_count);
			setRate(utils.transformPercent(share_reflux_ratio));
			setUserCount(share_user_count);
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		});

		return () => {
			api.cancelRequest();
		};
	}, [date]);

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
				{renderItem('分享人数',userCount)}
				{renderItem('分享次数',count)}
				{renderItem('回流量',openCount)}
				{renderItem('分享回流比',rate)}
				{renderItem('分享新增',newCount)}
			</div>
		</Loading>
	);
}