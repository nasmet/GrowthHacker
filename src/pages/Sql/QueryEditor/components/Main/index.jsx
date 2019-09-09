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
import mainConfig from './mainConfig';

const {
	Item,
} = Tab;

export default function Main() {
	const handleSql = () => {

	};

	const rendTab = () => {
		return mainConfig.map((item) => {
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
		<div className={styles.wrap}>
			<div className={styles.head}>
      			<Input.TextArea className={styles.input} placeholder="请输入sql语句" aria-label="TextArea" />
      			<Button className={styles.btn} type='primary' onClick={handleSql}>执行</Button>
      		</div>
			
			<div className={styles.middle}>
	      		<Tab defaultActiveKey="recentquery">
	        		{rendTab()}
	      		</Tab>
      		</div>
    	</div>
	);
}