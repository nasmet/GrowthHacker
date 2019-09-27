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

const {
	Column,
} = Table;

export default function Template({
	projectId,
	openId,
	tab,
	onEventDetals,
}) {
	const [curPage, setCurPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [tableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(false);
	let cancelTask = false;

	useEffect(() => {
		function getUserScrutinyEvents() {
			setLoading(true);
			api.getUserScrutinyEvents({
				projectId,
				openId,
				trend: {
					tab,
					limit: config.LIMIT,
					offset: (curPage - 1) * config.LIMIT,
				},
			}).then((res) => {
				if (cancelTask) {
					return;
				}
				const {
					total,
					events,
				} = res;
				setTotal(total);
				setTableData(events.map((item) => {
					const {
						title,
						event,
						created_at,
					} = item;
					return {
						title,
						event,
						created_at,
					};
				}));
			}).catch((e) => {
				Message.success(e.toString());
			}).finally(() => {
				if (cancelTask) {
					return;
				}
				setLoading(false);
			});
		}

		getUserScrutinyEvents();

		return () => {
			cancelTask = true;
		};
	}, [curPage]);

	const pageChange = (e) => {
		setCurPage(e);
	};

	const renderTimeColumn = (value, index, record) => {
		const val = record.created_at || '';
		return <span>{utils.formatUnix(val,'Y-M-D h:m:s')}</span>
	};

	const onRowClick = (record) => {
		onEventDetals(record);
	};

	return (
		<IceContainer>
      		<Table 
				loading={loading} 
				dataSource={tableData} 
				hasBorder={false}
				onRowClick={onRowClick}
			>
				<Column title='事件名称' dataIndex='title' />
				<Column title='事件标识符' dataIndex='event' />
				<Column title='事件时间' cell={renderTimeColumn} />
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