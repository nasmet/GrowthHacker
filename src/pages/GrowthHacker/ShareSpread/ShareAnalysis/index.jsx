import React, {
	useState,
} from 'react';
import {
	Input,
	Table,
	Loading,
	Pagination,
} from '@alifd/next';
import IceContainer from '@icedesign/container';

export default function ShareAnalysis() {
	const [emptyContent, setEmptyContent] = useState(1);

	const {
		response,
		loading,
		updateParameter,
		parameter,
	} = hooks.useRequest(api.getShareAnalysis, {
		date: 'day:0',
		name: '',
	});
	const {
		data = [],
	} = response;

	const dateChange = date => {
		updateParameter({ ...parameter,
			date,
		});
	};

	const renderFiveColumn = (value, index, record) => {
		return `${utils.transformPercent(record.share_reflux_ratio)}`;
	};

	const onInputChange = e => {
		updateParameter({ ...parameter,
			name: e,
		});
		setEmptyContent(e ? 0 : 1);
	};

	return (
		<Components.Wrap>
			<Components.Title title='分享触发分析' />
			<Components.DateFilter filterChange={dateChange} />
			<p>
				<Input 
					hasClear 
					hint='search' 
					placeholder="请输入触发名称" 
					onChange={utils.debounce(onInputChange, 500)}
				/>
			</p>
			<IceContainer>
				<Loading visible={loading} inline={false}>
					<Table 
						dataSource={data} 
						hasBorder={false}
						emptyContent={<span>{emptyContent?'暂无数据':'查询结果为空'}</span>}
					>
						<Table.Column title='触发名称' dataIndex='trigger_name' />
						<Table.Column title='分享人数' dataIndex='share_user_count' />
						<Table.Column title='分享次数' dataIndex='share_count' />
						<Table.Column title='分享回流量' dataIndex='share_open_count' />
						<Table.Column title='分享回流比' cell={renderFiveColumn} />
						<Table.Column title='分享新增' dataIndex='new_count' />
					</Table>
				</Loading>
			</IceContainer>
		</Components.Wrap>
	);
}