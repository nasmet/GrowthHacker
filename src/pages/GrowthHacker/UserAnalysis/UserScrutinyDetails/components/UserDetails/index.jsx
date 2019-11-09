import React from 'react';
import styles from './index.module.scss';

export default function UserDetails({
	record,
}) {
	const chartStyle = {
		x: 'device_brand',
		y: 'device_brand_count',
		color: 'device_brand',
		gLabel: (val, item) => {
			return `${item.point.device_brand}: ${val}`;
		},
		height: 200,
	};

	const {
		response,
		loading,
	} = hooks.useRequest(api.getUserScrutinyDetails, {
		openId: record[1],
	});
	const {
		devices = [],
			last_login_device = '',
	} = response;

	const renderItem = (name, value) => {
		return (
			<p>
				<span className={styles.name}>{name}：</span>
				<span className={styles.value}>{value}</span>
			</p>
		);
	};

	return (
		<div className={styles.wrap}>
			{renderItem('城市',record[2])}
			{renderItem('openId',record[1])}
			{renderItem('上次访问设备',last_login_device)}
			{renderItem('近30天访问',record[4])}
			{renderItem('最近访问',utils.formatUnix(record[3],'Y-M-D h:m:s'))}
			<p>
				<span className={styles.name}>设备使用情况：</span>
			</p>
			<Components.BasicPercentSector data={devices} {...chartStyle}  />
  		</div>
	);
}