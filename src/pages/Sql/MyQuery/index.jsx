import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Input,
	Tab,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import myQueryConfig from './myQueryConfig';

export default function MyQuery() {
	const [saveQueryCount, setSaveQueryCount] = useState(0);
	const [runQueryCount, setRunQueryCount] = useState(0);

	const onInputChange = (e) => {
		console.log(e);
	};

	const renderCount = (key) => {
		switch (key) {
			case 'recentlysavedquery':
				return saveQueryCount;
			case 'recentlyrunquery':
				return runQueryCount;
			default:
				return 0;
		}
	}

	const rendTab = () => {
		return myQueryConfig.map((item) => {
			const Content = item.component;
			const {
				key,
				tab,
			} = item;
			return (
				<Tab.Item 
					key={key} 
					title={
						<div>
							<span>{tab}</span>
							<span className={styles.count}>{renderCount(key)}</span>
						</div>	
					} 
				>
         			<Content />
        		</Tab.Item>
			);
		});
	};

	return (
    	<IceContainer>
    		<Input className={styles.input} hasClear hint='search' placeholder="搜索查询" onChange={utils.debounce(onInputChange, 500)}/>
    		<Tab defaultActiveKey="recentlysavedquery">
	        	{rendTab()}
	      	</Tab>
    	</IceContainer>
	);
}