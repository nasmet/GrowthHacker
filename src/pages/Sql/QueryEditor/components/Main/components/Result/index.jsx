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
			if(index===0){
				return <Column key={index} title={item} dataIndex={index.toString()} lock width={120} />
			}
			return <Column key={index} title={item} dataIndex={index.toString()} width={140} />
		})
	};

	return (
		<IceContainer>
			<Table dataSource={data} hasBorder={false} fixedHeader maxBodyHeight={400}>
			    {renderTitle()}       		
			</Table>
    	</IceContainer>
	);
}