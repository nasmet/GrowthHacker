import React from 'react';
import {
	Table,
	Loading,
} from '@alifd/next';
import IceContainer from '@icedesign/container';

export default function AdAnalysis() {
	const {
		response,
		loading,
		updateParameter,
		parameter,
	} = hooks.useRequest(api.getAdAnalysis, {
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

	const renderTwoColumn = (value, index, record) => {
		return <span>{utils.transformPercent(record[2])}</span>
	};

	const renderThreeColumn = (value, index, record) => {
		return <span>{utils.formatTime(record[3])}</span>
	};

	const renderTitles = () => {
		return meta.map((item, index) => {
			if (index === 2) {
				return <Table.Column key={index} title={item} cell={renderTwoColumn} />;
			}
			if (index === 3) {
				return <Table.Column key={index} title={item} cell={renderThreeColumn} />;
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />;
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

	return (
		<Components.Wrap>
			<Components.Title title='付费率分析' desc='用户数量，用户占活跃用户比例，平均用户总游戏时长' />
			<IceContainer>
				<Components.DateFilter filterChange={dateChange} />
				<Components.GroupFilter filterChange={groupChange} />	
			</IceContainer>
			<IceContainer>
				<div className='table-update-btns'>					
					<Components.Refresh onClick={onRefresh} />
					{data.length > 0 && <Components.ExportExcel fileName='付费率分析' handle={handleData} />}
				</div>
				<Loading visible={loading} inline={false}>
					<Table dataSource={data} hasBorder={false} fixedHeader maxBodyHeight={400} >
						{renderTitles()}
					</Table>
				</Loading>
			</IceContainer>
		</Components.Wrap>
	);
}