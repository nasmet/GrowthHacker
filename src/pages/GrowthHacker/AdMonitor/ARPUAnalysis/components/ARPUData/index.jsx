import React, {
	Component,
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

export default function ARPUData() {
	const {
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getARPUData,{date:'day:0'});
	const {
		meta=[],
		data=[],
	} = response;

	const filterChange = e => {
		updateParameter({date:e});
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
      		<Components.DateFilter filterChange={filterChange} />
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