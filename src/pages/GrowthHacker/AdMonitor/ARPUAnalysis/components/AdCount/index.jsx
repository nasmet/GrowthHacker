import React from 'react';
import {
	Table,
	Loading,
} from '@alifd/next';
import IceContainer from '@icedesign/container';

export default function AdCount() {
	const {
		response,
		loading,
		updateParameter,
		parameter,
	} = hooks.useRequest(api.getARPUDaily, {
		date: 'day:0',
		seg_id: 0,
	});
	const {
		meta = [],
		data = [],
	} = response;

	const dateChange = (e) => {
		updateParameter(Object.assign({
			date: e,
		}));
	};

	const groupChange = e => {
		updateParameter(Object.assign({
			seg_id: e,
		}));
	};

	const renderTitles = () => {
		return meta.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()} lock={index>0?false:true} width={index>0?120:140} />;
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
					<Table dataSource={data} hasBorder={false} fixedHeader maxBodyHeight={400}>
						{renderTitles()}
					</Table>					
				</Loading>
			</IceContainer>
		</Components.Wrap>
	);
}