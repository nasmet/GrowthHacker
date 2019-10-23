import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Table,
	Loading,
	Pagination,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function AdAnalysis() {
	const {
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getAdAnalysis,{date:'day:0'});
	const {
		meta=[],
		data=[],
	} = response;

	const filterChange = (e) => {
		updateParameter({date:e});
	};

	const renderTwoColumn = (value, index, record) => {
		return <span>{utils.transformPercent(record[2])}</span>
	};

	const renderTitles = () => {
		return meta.map((item, index) => {
			if (index === 2) {
				return <Table.Column key={index} title={item} cell={renderTwoColumn} />;
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />;
		});
	};

	return (
		<Components.Wrap>
			<Components.Title title='付费率分析' desc='用户数量，用户占活跃用户比例，平均用户总游戏时长' />
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