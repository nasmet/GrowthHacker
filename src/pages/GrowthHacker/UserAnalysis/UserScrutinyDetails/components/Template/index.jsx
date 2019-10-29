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

export default function Template({
	openId,
	tab,
}) {
	const [curPage, setCurPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [tableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		function getUserScrutinyEvents() {
			setLoading(true);
			api.getUserScrutinyEvents({
				openId,
				trend: {
					tab,
					limit: config.LIMIT,
					offset: (curPage - 1) * config.LIMIT,
				},
			}).then((res) => {
				const {
					total,
					events,
				} = res;
				setTotal(total);
				setTableData(events);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}

		getUserScrutinyEvents();

		return () => {
			api.cancelRequest();
		};
	}, [curPage]);

	const pageChange = (e) => {
		setCurPage(e);
	};

	const renderTimeColumn = (value, index, record) => {
		const val = record.created_at || '';
		return <span>{utils.formatUnix(val,'Y-M-D h:m:s')}</span>
	};

	return (
		<IceContainer>
      		<Table 
				loading={loading} 
				dataSource={tableData} 
				hasBorder={false}
			>
				<Table.Column title='事件名称' dataIndex='name' />
				<Table.Column title='事件标识符' dataIndex='event' />
				<Table.Column title='事件时间' cell={renderTimeColumn} />
			</Table>
		 	<Pagination
            	className={styles.pagination}
           		current={curPage}
            	total={total}
            	onChange={pageChange}
		    />
    	</IceContainer>
	);
}