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
	const projectId = sessionStorage.getItem('projectId');
	let cancelTask = false;

	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [titles, setTitles] = useState([]);
	const [values, setValues] = useState(['0']);

	useEffect(() => {
		function getShareTrend() {
			setLoading(true);
			let date = '';
			if (values.length === 1) {
				date = `day:${values[0]}`;
			} else {
				date = `abs:${values[0]},${values[1]}`;
			}
			api.ShareTrend({
				project_id: projectId,
				trend: {
					date,
				}
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

		// getShareTrend();
	}, [values]);

	const filterChange = (e) => {
		setValues(e);
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