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

export default function UserShare({
	type,
	date,
}) {
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

	const renderFiveColumn = (value, index, record) => {
		return `${utils.transformPercent(record.share_reflux_ratio)}`;
	};

	const onRefresh = () => {
		updateParameter(parameter);
	};

	const handleData = () => {
		return {
			sheetHeader: ['日期', '用户', '分享人数', '分享次数', '回流量', '分享回流量比', '分享新增'],
			sheetData: data.map(item => {
				return {
					...item,
					share_reflux_ratio: utils.transformPercent(item.share_reflux_ratio),
					time_range: formatTime(item.time_range),
				}
			}),
		}
	};

	function formatTime(time_range) {
		const start = time_range.from;
		const end = time_range.to;
		if (end - start > 3600) {
			return utils.formatUnix(start, 'Y-M-D');
		}
		const formatStart = utils.formatUnix(start, 'h:m');
		const formatEnd = utils.formatUnix(end, 'h:m');
		return `${formatStart}-${formatEnd}`;
	}

	const renderFirstColumn = (value, index, record) => {
		return <span>{formatTime(record.time_range)}</span>;
	};
	
	return (
		<Components.Wrap>
			<IceContainer>
				<div className='table-update-btns'>					
					<Components.Refresh onClick={onRefresh} />
					{data.length > 0 && <Components.ExportExcel fileName='用户分享' handle={handleData} />}
				</div>
				<Loading visible={loading} inline={false}>
					<Table dataSource={data} hasBorder={false} >
						<Table.Column title='日期' cell={renderFirstColumn} />
						<Table.Column title='用户' dataIndex='wechat_openid' />
						<Table.Column title='分享人数' dataIndex='share_user_count' />
						<Table.Column title='分享次数' dataIndex='share_count' />
						<Table.Column title='回流量' dataIndex='share_open_count' />
						<Table.Column title='分享回流比' cell={renderFiveColumn} />
						<Table.Column title='分享新增' dataIndex='new_count' />
					</Table>
				</Loading>
				<Pagination
					className={styles.pagination}
					total={total}
					onChange={pageChange}
				/>
			</IceContainer>
		</Components.Wrap>
	);
}