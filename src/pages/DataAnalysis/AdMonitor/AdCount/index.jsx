import React from 'react';
import {
	Table,
	Loading,
} from '@alifd/next';
import IceContainer from '@icedesign/container';

export default function AdCount() {
	const {
		parameter,
		response,
		loading,
		updateParameter,
		updateResponse,
	} = hooks.useRequest(api.getAdCount, {
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

	const renderColumn = (column, value, index, record) => {
		if(record[column]===null){
			return <span>-</span>;
		}
		return <span>{record[1]===0||record[column]===0?0:(record[column]/record[1]).toFixed(2)}</span>
	};

	const renderTitles = () => {
		return meta.map((item, index) => {
			if (index === 0) {
				return <Table.Column key={index} title={item} dataIndex={index.toString()} lock width={120} />;
			}
			if (index === 1) {
				return <Table.Column key={index} title={item} dataIndex={index.toString()} sortable />;
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} cell={renderColumn.bind(this, index)} sortable />;
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
		const cb = dataIndex == 1?a=>a:((a, b)=> b==0||a==0?0:(a/b).toFixed(2));
		data.sort((a,b)=>order==='desc'?cb(b[dataIndex],b[1])-cb(a[dataIndex],a[1]):cb(a[dataIndex],a[1])-cb(b[dataIndex],b[1]));
		updateResponse();
	};

	const maxBodyHeight=document.body.clientHeight-500;

	return (
		<Components.Wrap>
			<Components.Title title='生命周期广告次数' desc='统计每天的新用户在1、2、3、7、14、30的广告累计点击次数' />
			<IceContainer>
				<Components.DateFilter filterChange={dateChange} />
				<Components.GroupFilter filterChange={groupChange} />
			</IceContainer>
			<IceContainer>
				<div className='table-update-btns'>					
					<Components.Refresh onClick={onRefresh} />
					{data.length > 0 && <Components.ExportExcel fileName='生命周期广告次数' handle={handleData} />}
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