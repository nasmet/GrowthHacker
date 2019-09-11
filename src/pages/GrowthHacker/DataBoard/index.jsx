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
import  dataBoardConfig from './dataBoardConfig';

const {
	Item,
} = Tab;

export default function DataBoard() {
	const rendTab = () => {
		return dataBoardConfig.map((item) => {
			const Content = item.component;
			return (
				<Item key={item.key} title={item.tab} >
          			<div className={styles.marginTop10}>
            			<Content />
          			</div>
        		</Item>
			);
		});
	};

	return (
		<div>
      		<Tab defaultActiveKey="gl">
        		{rendTab()}
      		</Tab>
    	</div>
	);
}