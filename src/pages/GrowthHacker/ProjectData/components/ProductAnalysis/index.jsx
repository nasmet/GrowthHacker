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
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import productAnalysisConfig from './productAnalysisConfig';

const {
	Item,
} = Tab;

function ProductAnalysis({
	projectId,
	history,
}) {
	const renderTab = () => {
		return productAnalysisConfig.map((item) => {
			const Content = item.component;
			return (
				<Item key={item.key} title={item.tab} >
          			<div className={styles.marginTop10}>
            			<Content projectId={projectId} />
          			</div>
        		</Item>
			);
		});
	};

	return (
		<div className={styles.wrap}>
			<Tab defaultActiveKey="ra" size='small'>
	    		{renderTab()}
	  		</Tab>
	  	</div>
	);
}

export default withRouter(ProductAnalysis);