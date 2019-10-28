import React, {
	useState,
	useEffect,
} from 'react';
import {
	Table,
	Loading,
	Pagination,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function UserShare({
	type,
	date,
}) {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [curPage, setCurPage] = useState(1);
	const [count, setCount] = useState(0);

	useEffect(() => {
		function getUserShare() {
			setLoading(true);
			api.getUserShare({
				tab: type,
				date,
				limit: config.LIMIT,
				offset: (curPage - 1) * config.LIMIT,
			}).then((res) => {
				setCount(res.total);
				setTableData(res.data);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}

		getUserShare();
	}, [date, curPage, type]);

	const pageChange = (e) => {
		setCurPage(e);
	};

	const renderFiveColumn = (value, index, record) => {
		return `${utils.transformPercent(record.share_reflux_ratio)}`;
	};

	return (
		<div className={styles.content}>
			<IceContainer>
				<Loading visible={loading} inline={false}>
					<Table dataSource={tableData} hasBorder={false} >
						<Table.Column title='用户' dataIndex='wechat_openid' />
						<Table.Column title='分享次数' dataIndex='share_count' />
						<Table.Column title='回流量' dataIndex='share_open_count' />
						<Table.Column title='分享回流比' cell={renderFiveColumn} />
						<Table.Column title='分享新增' dataIndex='new_count' />
					</Table>
				</Loading>
				<Pagination
					className={styles.pagination}
					current={curPage}
					total={count}
					onChange={pageChange}
				/>
			</IceContainer>
		</div>
	);
}