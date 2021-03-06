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
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function Column({
	sql,
}) {
	return (
		<IceContainer>
			<div className={styles.wrap}>
				{sql.map(item=> <span className={styles.name} key={item}>{item}</span>)}
			</div>
    	</IceContainer>
	);
}