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
const limit = 10;

export default function RecentQuery({
	sql,
	switchResultTab,
}) {
	const onViewResult = query => {
		switchResultTab(query);
	};

	const renderCover = (value, index, record) => {
		return (
			<Button type="primary" onClick={onViewResult.bind(this, record.query)}>
        		查看结果
      		</Button>
		);
	};

	return (
		<IceContainer>
          	<Table 
          		dataSource={sql} 
          		hasBorder={false} 
          	>	
            	<Column title="查询" dataIndex="query" />
            	<Column title="时间" dataIndex="time" />
            	<Column title="结果" cell={renderCover} />
          	</Table>
	    </IceContainer>
	);
}