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

export default function DeviceInfo({
	deviceInfo,
}) {
	const renderDeviceInfo = () => {
		return deviceInfo.map((item, index) => {
			const {
				name,
				value,
			} = item;
			return (
				<div className={styles.item} key={index}>
      				<span className={styles.name}>{name}：</span>
      				<span className={styles.value}>{value}</span>
      			</div>
			);
		});
	};

	return (
		<div className={styles.event}>
			<div className={styles.details}>事件详情</div>
			<div className={styles.start}>访问开始</div>
			<div className={styles.device}>
				{renderDeviceInfo()}
			</div>
		</div>
	);
}