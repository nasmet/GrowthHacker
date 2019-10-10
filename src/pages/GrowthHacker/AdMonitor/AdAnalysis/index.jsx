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

export default function AdAnalysis() {
	const projectId = sessionStorage.getItem('projectId');
	let cancelTask = false;
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		function getAdAnalysis() {
			setLoading(true);
			api.getAdAnalysis().then((res) => {
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
			<Components.Title title='广告分析' />
			<IceContainer>
				<Table dataSource={tableData} loading={loading} hasBorder={false} >
					<Table.Column title='玩家ID' />
					<Table.Column title='首次看广告的位置' />
					<Table.Column title='此时总游戏时长' />
				</Table>
			</IceContainer>
    	</Components.Wrap>
	);
}