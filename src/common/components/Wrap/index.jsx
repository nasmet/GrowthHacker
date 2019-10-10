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

export default function Wrap({
	children,
}) {
	return (
		<div className={styles.wrap}>
      		{children}
    	</div>
	);
}