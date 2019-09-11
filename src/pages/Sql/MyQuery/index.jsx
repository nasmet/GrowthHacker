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
import myQueryConfig from './myQueryConfig';

const {
	Item,
} = Tab;

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
				<Item 
					key={key} 
					title={
						<div>
							<span>{tab}</span>
							<span className={styles.count}>{renderCount(key)}</span>
						</div>	
					} 
				>
         			<div className={styles.marginTop10}>
            			<Content />
          			</div>
        		</Item>
			);
		});
	};

	return (
		<div>
			<IceContainer>
				<div className={styles.title}>
		      		查询
		    	</div>

		    	<Input className={styles.input} hasClear hint='search' placeholder="搜索查询" onChange={utils.debounce(onInputChange, 500)}/>
	    	</IceContainer>

	    	<IceContainer>
	    		<Tab defaultActiveKey="recentlysavedquery">
		        	{rendTab()}
		      	</Tab>
	    	</IceContainer>
    	</div>
	);
}