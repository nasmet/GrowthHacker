import React, {
	Component,
} from 'react';
import {
	Tab,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import productAnalysisConfig from './productAnalysisConfig';

const {
	Item,
} = Tab;

export default function ProductAnalysis({
	projectId,
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