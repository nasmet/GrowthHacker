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
} from '@alifd/next';
import styles from './index.module.scss';
import userAnalysisConfig from './userAnalysisConfig';

const {
	Item,
} = Tab;

export default function UserAnalysis({
	projectId,
}) {
	const renderTab = () => {
		return userAnalysisConfig.map((item) => {
			const {
				key,
				tab,
				Component,
			} = item;
			return (
				<Item key={key} title={tab}>
					<Component projectId={projectId} />
				</Item>
			);
		});
	}

	return (
		<div className={styles.wrap}>
			<Tab defaultActiveKey='up' size='small'>
				{renderTab()}
			</Tab>
		</div>
	);
}