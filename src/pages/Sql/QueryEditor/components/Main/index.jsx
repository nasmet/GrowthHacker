import React, {
	useState,
	useEffect,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Loading,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import {
	tabs,
} from './config';

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

	useEffect(() => {
		setValue((pre) => {
			if (pre) {
				return `${pre}; ${query}`;
			}
			return `${query}`;
		})

		return () => {
			api.cancelRequest();
		};
	}, [query]);

	const onChange = (e) => {
		setValue(e);
	};

	const handleSql = () => {
		if (!value) {
			model.log('内容不能为空！');
			return;
		}
		setLoading(true);
		api.getSqlData({
			query: value,
		}).then((res) => {
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
			model.log(e);
		}).finally(() => {
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
		return tabs.map((item) => {
			const Content = item.component;
			const {
				key,
				tab,
			} = item;
			return (
				<Tab.Item key={key} title={tab} >
            		<Content sql={transferData(key)} />
        		</Tab.Item>
			);
		});
	};

	const resetSql = () => {
		setValue('');
	};

	return (
		<Loading visible={loading} inline={false}>
			<Components.Wrap>
				<IceContainer>
	      			<Input.TextArea className={styles.input} onChange={onChange} value={value} placeholder="请输入sql语句" aria-label="TextArea" />
	      			<div>
	      				<Button className={styles.btn} type='primary' onClick={handleSql}>执行</Button>
	      				<Button className={styles.btn} type='primary' onClick={resetSql}>重置</Button>
	      			</div>
	      		</IceContainer>
				
				<IceContainer>
		      		<Tab defaultActiveKey="recentquery" >
		        		{rendTab()}
		      		</Tab>
	      		</IceContainer>
	    	</Components.Wrap>
    	</Loading>
	);
}