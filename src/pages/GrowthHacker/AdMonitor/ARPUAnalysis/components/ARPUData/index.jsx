import React from 'react';
import {
	Table,
	Loading,
} from '@alifd/next';
import IceContainer from '@icedesign/container';

export default function ARPUData() {
	const {
		response,
		loading,
		updateParameter,
		parameter,
	} = hooks.useRequest(api.getARPUData, {
		date: 'day:0',
		seg_id: 0,
	});
	const {
		meta = [],
		data = [],
	} = response;

	const dateChange = (e) => {
		updateParameter({
			date: e,
			seg_id: parameter.seg_id,
		});
	};

	const groupChange = e => {
		updateParameter({
			date: parameter.date,
			seg_id: e,
		});
	};

	const renderSixColumn = (value, index, record) => {
		return <span>{utils.transformPercent(record[6])}</span>
	};

	const renderTitles = () => {
		return meta.map((item, index) => {
			if (index === 6) {
				return <Table.Column key={index} title={item} cell={renderSixColumn} />;
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />;
		});
	};

	return (
		<Components.Wrap>
			<IceContainer>
				<Components.DateFilter filterChange={dateChange} />
				<Components.GroupFilter filterChange={groupChange} />
			</IceContainer>   	   		
			<IceContainer>
				<Loading visible={loading} inline={false}>
					<Table dataSource={data} hasBorder={false} fixedHeader maxBodyHeight={400} >
						{renderTitles()}
					</Table>
				</Loading>
			</IceContainer>
		</Components.Wrap>
	);
}