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

export default function Main({
	query,
}) {
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState('');
	const [recentQueryData, setRecentQueryData] = useState([]);
	const [queryData, setQueryData] = useState("");
	const [logData, setLogData] = useState([]);
	const [columnData, setColumnData] = useState([]);
	const [resultData, setResultData] = useState([]);
	const [graphData, setGraphData] = useState([]);

	useEffect(() => {
		setValue((pre) => {
			if (pre) {
				return `${pre}, ${query}`;
			}
			return `${query}`;
		})
	}, [query]);

	const onChange = (e) => {
		setValue(e);
	};

	const handleSql = () => {
		if (!value) {
			Message.success('内容不能为空！');
			return;
		}
		setLoading(true);
		setTimeout(() => {
			setRecentQueryData((pre) => {
				return [{
					time: utils.formatUnix(Date.now() / 1000, 'Y-M-D h:m:s'),
					query: value,
				}, ...pre];
			});
			setQueryData(value);
			setLoading(false);
		}, 1000);
	};

	const transferData = (key) => {
		switch (key) {
			case 'recentquery':
				return recentQueryData;
			case 'query':
				return queryData;
			case 'log':
				return logData;
			case 'column':
				return columnData;
			case 'result':
				return resultData;
			case 'graph':
				return graphData;
			default:
				return [];
		}
	};

	const rendTab = () => {
		return mainConfig.map((item) => {
			const Content = item.component;
			const {
				key,
				tab,
			} = item;
			return (
				<Item key={key} title={tab} >
         			<div className={styles.marginTop10}>
            			<Content sql={transferData(key)} />
          			</div>
        		</Item>
			);
		});
	};

	return (
		<Loading visible={loading} inline={false}>
			<div className={styles.wrap}>
				<div className={styles.head}>
	      			<Input.TextArea className={styles.input} onChange={onChange} value={value} placeholder="请输入sql语句" aria-label="TextArea" />
	      			<Button className={styles.btn} type='primary' onClick={handleSql}>执行</Button>
	      		</div>
				
				<div className={styles.middle}>
		      		<Tab defaultActiveKey="recentquery">
		        		{rendTab()}
		      		</Tab>
	      		</div>
	    	</div>
    	</Loading>
	);
}