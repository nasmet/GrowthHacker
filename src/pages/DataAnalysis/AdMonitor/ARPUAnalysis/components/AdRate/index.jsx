import React from 'react';
import {
	Table,
	Loading,
} from '@alifd/next';
import IceContainer from '@icedesign/container';

export default function AdRate() {
	const {
		response,
		loading,
		updateParameter,
		parameter,
		updateResponse,
	} = hooks.useRequest(api.getARPURate, {
		date: 'day:0',
		seg_id: 0,
	});
	const {
		meta = [],
			data = [],
	} = response;

	const dateChange = (e) => {
		updateParameter({ ...parameter,
			date: e,
		});
	};

	const groupChange = e => {
		updateParameter({ ...parameter,
			seg_id: e,
		});
	};

	const renderTitles = () => {
		return meta.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()} lock={index>0?false:true} width={index>0?120:140} sortable />;
		});
	};

	const onRefresh = () => {
		updateParameter(parameter);
	};

	const handleData = () => {
		return {
			sheetHeader: meta,
			sheetData: data,
		};
	};

	const onSort = (dataIndex, order) => {
		data.sort((a,b)=>order==='desc'?b[dataIndex]-a[dataIndex]:a[dataIndex]-b[dataIndex]);
		updateResponse();
	};

	const maxBodyHeight=document.body.clientHeight-500;

	return (
		<Components.Wrap>
			<IceContainer>
				<Components.DateFilter filterChange={dateChange} />
				<Components.GroupFilter filterChange={groupChange} />
			</IceContainer>  		
			<IceContainer>
				<div className='table-update-btns'>					
					<Components.Refresh onClick={onRefresh} />
					{data.length > 0 && <Components.ExportExcel fileName='广告点击率' handle={handleData} />}
				</div>
				<Loading visible={loading} inline={false}>
					<Table dataSource={data} hasBorder={false} fixedHeader maxBodyHeight={maxBodyHeight} onSort={onSort} >
						{renderTitles()}
					</Table>
				</Loading>
			</IceContainer>
		</Components.Wrap>
	);
}