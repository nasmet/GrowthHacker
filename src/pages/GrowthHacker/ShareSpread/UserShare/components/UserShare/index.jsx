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

const {
	Column,
} = Table;

export default function UserShare() {
	return (
		<div className={styles.content}>
			<Table data={[]}>
				<Column title='用户' dataIndex='user' />
				<Column title='备注' dataIndex='remark' />
				<Column title='分享次数' dataIndex='shareCount' />
				<Column title='回流量' dataIndex='flow' />
				<Column title='分享回流比' dataIndex='shareRate' />
				<Column title='分享新增' dataIndex='shareAddition' />
			</Table>
		</div>
	);
}