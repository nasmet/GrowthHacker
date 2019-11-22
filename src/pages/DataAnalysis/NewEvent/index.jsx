import React from 'react';
import {
	Table,
	Loading,
} from '@alifd/next';
import IceContainer from '@icedesign/container';

export default function NewEvent() {
	const appid = sessionStorage.getItem(config.PROJECTAPPID);
	const {
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getSqlData, {
		query: model.sql.eventSql(appid),
	});

	const {
		columns = [],
			data = [],
	} = response;

	const renderTitle = () => {
		return columns.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()}/>
		});
	};

	const onRefresh = () => {
		updateParameter(parameter);
	};

	const handleData = () => {
		return {
			sheetHeader: columns,
			sheetData: data,
		};
	};

	return (
		<Components.Wrap>
			<IceContainer>
				<div className='table-update-btns'>					
					<Components.Refresh onClick={onRefresh} />
					{data.length > 0 && <Components.ExportExcel fileName='最新打点事件' handle={handleData} />}
				</div>
				<Loading visible={loading} inline={false}>
					<Table dataSource={data} hasBorder={false}>
						{renderTitle()}       		
					</Table>
				</Loading>
			</IceContainer>
		</Components.Wrap>
	);
}