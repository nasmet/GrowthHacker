import React, {
	useEffect,
} from 'react';
import {
	Table,
	Loading,
	Pagination,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function CityDistribute({
	type,
	date,
}) {
	const chartStyle = {
		x: 'city',
		y: 'count',
		color: 'event',
	};

	const {
		response,
		loading,
		updateParameter,
		parameter,
	} = hooks.useRequest(api.getUserShare, {
		tab: type,
		date,
		limit: config.LIMIT,
		offset: 0,
	}, false);

	const {
		total = 0,
			data = [],
	} = response;


	useEffect(() => {
		updateParameter({ ...parameter,
			date,
		});
	}, [date]);

	const pageChange = (e) => {
		updateParameter({ ...parameter,
			offset: (e - 1) * config.LIMIT,
		});
	};

	function assembleChartData() {
		const temp = [];
		data.map((item) => {
			const {
				city,
				new_count,
				share_count,
				share_open_count,
				share_reflux_ratio,
				share_user_count,
			} = item;
			temp.push({
				city,
				event: '分享人数',
				count: share_user_count,
			});
			temp.push({
				city,
				event: '分享次数',
				count: share_count,
			});
			temp.push({
				city,
				event: '回流量',
				count: share_open_count,
			});
			temp.push({
				city,
				event: '分享回流比',
				count: share_reflux_ratio,
			});
			temp.push({
				city,
				event: '分享新增',
				count: new_count,
			});
		});
		return temp;
	}

	const renderFiveColumn = (value, index, record) => {
		return `${utils.transformPercent(record.share_reflux_ratio)}`;
	};

	const onRefresh = () => {
		updateParameter(parameter);
	};

	return (
		<Components.Wrap>
			<Loading visible={loading} inline={false}>					
				<IceContainer>
					<Components.BasicColumn data={assembleChartData()} {...chartStyle} forceFit />
					<div className='table-update-btns'>					
						<Components.Refresh onClick={onRefresh} />
					</div>
					<Table dataSource={data} hasBorder={false}>
						<Table.Column title='城市' dataIndex='city' />
						<Table.Column title='分享人数' dataIndex='share_user_count' />
						<Table.Column title='分享次数' dataIndex='share_count' />
						<Table.Column title='回流量' dataIndex='share_open_count' />
						<Table.Column title='回流量占比' cell={renderFiveColumn} />
						<Table.Column title='分享新增' dataIndex='new_count' />
					</Table>
					<Pagination
						className={styles.pagination}
						total={total}
						onChange={pageChange}
					/>
				</IceContainer>
			</Loading>
		</Components.Wrap>
	);
}