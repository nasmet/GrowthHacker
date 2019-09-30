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

export default function ShareAnalysis() {
	const projectId = sessionStorage.getItem('projectId');
	let cancelTask = false;
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [titles, setTitles] = useState([]);

	function getShareAnalysis() {
		setLoading(true);
		api.getShareAnalysis({
			projectId,
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			console.log(res);
		}).catch((e) => {
			Message.success(e);
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});
	}

	useEffect(() => {
		// getShareAnalysis();
		
		return () => {
			cancelTask = true;
		};
	}, []);

	const filterChange = (e) => {
		console.log(e);
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
			<p className={styles.title}>分享触发分析</p>
			<Filter filterChange={filterChange} />
			<IceContainer>
				<Table loading={loading} dataSource={tableData} hasBorder={false}>
					{renderTitles()}
				</Table>
			</IceContainer>
    	</div>
	);
}