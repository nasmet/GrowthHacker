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
	Icon,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Template from './components/Template';

const {
	Item,
} = Tab;

function DataBoardDetails({
	location,
}) {
	const {
		projectId,
		boardInfo,
	} = location.state;
	const {
		id,
		name,
		desc,
	} = boardInfo;
	const info = [{
		id: 0,
		name: '看板名称',
		value: name,
	}, {
		id: 1,
		name: '看板描述',
		value: desc,
	}];

	const renderInfo = () => {
		return info.map((item) => {
			const {
				id,
				name,
				value,
			} = item;
			return (
				<div key={id} className={styles.item}>
					<span>{name}：</span>
					<span className={styles.value}>{value}</span>
				</div>
			);
		});
	};

	return (
		<div>
			<IceContainer>
				{renderInfo()}
			</IceContainer>
			<Template projectId={projectId} boardId={id} />
		</div>
	);
}

export default withRouter(DataBoardDetails);