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
import Filter from '../Filter';

export default function ShareView() {
	const filterChange = (e) => {
		console.log(e);
	};

	const renderTop30 = () => {
		return [{
			name: '分享人数',
			value: 0,
		}, {
			name: '分享次数',
			value: 0,
		}, {
			name: '回流量',
			value: 0,
		}, {
			name: '分享回流比',
			value: 0,
		}, {
			name: '分享新增',
			value: 0,
		}].map((item, index) => {
			return (
				<div className={styles.item} key={index}>
					<span className={styles.value}>{item.value}</span>
					<span>{item.name}</span>
				</div>
			);
		});
	}

	return (
		<div className={styles.wrap}>
			<p className={styles.title}>分享概览</p>
			<Filter filterChange={filterChange} />
			<IceContainer>
				<div className={styles.list}>
					{renderTop30()}
				</div>
			</IceContainer>
    	</div>
	);
}