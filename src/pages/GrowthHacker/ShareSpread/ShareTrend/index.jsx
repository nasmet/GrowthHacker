import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Table,
	Message,
	Loading,
	Pagination,
	Icon,
	Dialog,
	Select,
	Grid,
	DatePicker,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Filter from '../Filter';

const {
	Column,
} = Table;

export default function ShareTrend() {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [titles, setTitles] = useState([]);
	const projectId = sessionStorage.getItem('projectId');
	let cancelTask = false;

	function getShareTrend() {
		setLoading(true);
		api.ShareTrend({
			project_id: projectId,
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			console.log(res);
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});
	}

	useEffect(() => {
		// getUserGroups();
	}, []);

	const filterChange = (e) => {
		console.log(e);
	};

	const renderTop30 = () => {
		return [{
			name: '分享人数',
			value: 0,
		}, {
			name: '分享次数',
			value: 0,
		}, {
			name: '回流量',
			value: 0,
		}, {
			name: '分享回流比',
			value: 0,
		}, {
			name: '分享新增',
			value: 0,
		}].map((item, index) => {
			return (
				<div className={styles.item} key={index}>
					<span className={styles.value}>{item.value}</span>
					<span>{item.name}</span>
				</div>
			);
		});
	};

	const renderTitles = () => {
		return titles.map((item, index) => {
			return (
				<Column key={index} title={item} dataIndex={index.toString()} />
			);
		});
	};

	return (
		<div className={styles.wrap}>
			<p className={styles.title}>分享趋势</p>
			<Filter filterChange={filterChange} />
			<IceContainer>
				<div className={styles.list}>
					{renderTop30()}
				</div>
				<Table 
					loading={loading} 
					dataSource={tableData} 
					hasBorder={false}
				>
					{renderTitles()}
				</Table>
			</IceContainer>
    	</div>
	);
}