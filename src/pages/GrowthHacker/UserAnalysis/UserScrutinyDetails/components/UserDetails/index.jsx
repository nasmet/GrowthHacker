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

export default function UserDetails({
	userInfo,
}) {
	return (
		<div className={styles.info}>
			<div className={styles.first}>
				<div className={styles.city}>
					<span className={styles.name}>城市：</span>
					<span className={styles.value}>深圳</span>
				</div>
				<div>
					<span className={styles.name}>ID：</span>
					<span className={styles.value}>0</span>
				</div>
			</div>
			<div className={styles.second}>
				<p>
					<span className={styles.name}>上次访问设备：</span>
					<span className={styles.value}>Apple</span>
				</p>
				<p>
					<span className={styles.name}>近30天访问：</span>
					<span className={styles.value}>5次</span>
				</p>
				<p>
					<span className={styles.name}>最近访问：</span>
					<span className={styles.value}>2019-09-25</span>
				</p>
			</div>
  		</div>
	);
}