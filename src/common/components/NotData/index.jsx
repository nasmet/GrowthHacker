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
import {
	Form,
	Field,
} from '@ice/form';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function NotData({
	style,
}) {
	return (
		<div className={styles.content} style={style}>
      		暂无数据
    	</div>
	);
}