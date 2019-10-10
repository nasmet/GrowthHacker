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
import {
	Form,
	Field,
} from '@ice/form';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function ARPUAnalysis() {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		function getARPUAnalysis() {
			setLoading(true);
			api.getARPUAnalysis().then((res) => {
				if (cancelTask) {
					return;
				}
				console.log(res);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				if (cancelTask) {
					return;
				}
				setLoading(false);
			});
		}

		return () => {
			cancelTask = true;
		}
	}, []);

	return (
		<Components.Wrap>
			<Components.Title title='ARPU分析' />
			<IceContainer>
				<Table dataSource={tableData} loading={loading} hasBorder={false} >
					<Table.Column title='数据日期' />
					<Table.Column title='活跃用户' />
					<Table.Column title='点广告用户' />
					<Table.Column title='广告总点击' />
					<Table.Column title='每用户点击' />
					<Table.Column title='每付费用户点击' />
					<Table.Column title='付费率' />
				</Table>
			</IceContainer>
    	</Components.Wrap>
	);
}