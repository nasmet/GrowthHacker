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

const {
	Column,
} = Table;

export default function Result({
	sql,
}) {
	const {
		titles,
		data,
	} = sql;
	const renderTitle = () => {
		return titles.map((item, index) => {
			return <Column key={index} title={item} dataIndex={index.toString()} />
		})
	};

	return (
		<IceContainer>
			<Table dataSource={data} hasBorder={false}>
			    {renderTitle()}       		
			</Table>
    	</IceContainer>
	);
}