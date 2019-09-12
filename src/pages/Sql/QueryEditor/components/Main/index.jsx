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
	const [resultData, setResultData] = useState({
		titles: [],
		data: [],
	});
	const [graphData, setGraphData] = useState([]);

	let cancelTask = false; // 防止内存泄露
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
		api.getSqlData({
			query: value,
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			console.log(res);
			const {
				columns,
				data,
			} = res;
			setRecentQueryData((pre) => {
				return [{
					id: pre.length + '',
					query: value,
					time: utils.formatUnix(Date.now() / 1000, 'Y-M-D h:m:s'),
				}, ...pre];
			});
			setResultData({
				titles: columns,
				data,
			});
			setQueryData(value);
			setColumnData(columns);
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});
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