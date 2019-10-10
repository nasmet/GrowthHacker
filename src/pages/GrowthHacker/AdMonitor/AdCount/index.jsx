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

export default function AdCount() {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		function getAdCount() {
			setLoading(true);
			api.getAdCount().then((res) => {
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
			<Components.Title title='广告次数' />
			<IceContainer>
				<Table dataSource={tableData} loading={loading} hasBorder={false} >
					<Table.Column title='注册日期' />
					<Table.Column title='玩家数' />
					<Table.Column title='1' />
					<Table.Column title='2' />
					<Table.Column title='3' />
					<Table.Column title='4' />
					<Table.Column title='5' />
					<Table.Column title='6' />
					<Table.Column title='7' />
					<Table.Column title='14' />
					<Table.Column title='30' />
				</Table>
			</IceContainer>
    	</Components.Wrap>
	);
}