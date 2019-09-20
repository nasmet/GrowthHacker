import React, {
	Component,
	useState,
	useEffect,
	useRef,
	useContext,
	useCallback,
	useMemo,
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

export default function Introduction({
	info,
}) {
	const renderInfo = () => {
		return info.map((item) => {
			const {
				id,
				name,
				value,
			} = item;
			return (
				<div key={id} className={styles.item}>
					<p>{name}：</p>
					<p className={styles.value}>{value}</p>
				</div>
			);
		});
	};

	return (
		<IceContainer>
			{renderInfo()}
		</IceContainer>
	);
}