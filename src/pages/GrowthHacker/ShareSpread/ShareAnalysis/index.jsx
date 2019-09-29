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

export default function ShareAnalysis() {
	const filterChange = (e) => {
		console.log(e);
	};

	return (
		<div className={styles.wrap}>
			<p className={styles.title}>分享触发分析</p>
			<Filter filterChange={filterChange} />
    	</div>
	);
}