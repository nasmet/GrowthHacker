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

export default function AdCount() {
	const {
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getARPUDaily,{date:'day:0'});
	const {
		meta=[],
		data=[],
	} = response;

	const filterChange = e => {
		updateParameter({date:e});
	};

	const renderTitles = () => {
		return meta.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()} lock={index>0?false:true} width={index>0?120:140} />;
		});
	};

	return (
		<Components.Wrap>
      		<Components.DateFilter filterChange={filterChange} />
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