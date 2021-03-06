import React from 'react';
import {
	Table,
	Loading,
} from '@alifd/next';
import IceContainer from '@icedesign/container';

export default function NewEvent() {
	const appid = cookies.get(config.PROJECTAPPID);
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

	const shareds = [0, 1, 2, 3, 42];
	const notRequired = [37, 38, 39, 40];

	function assembleData() {
		return data.map(item => {
			let params = '';
			const temp = [];
			item.map((v, index) => {
				if (notRequired.includes(index)) {
					return;
				}
				if (shareds.includes(index)) {
					temp.push(v);
					return;
				}
				if (v && v != '0') {
					params += `${columns[index]}: ${v}，`;
				}
			});
			if (!params) {
				params = '-';
			} else {
				params = params.substr(0, params.length - 1);
			}
			temp.push(params);
			return temp;
		});
	}

	const renderFirstCell = (value, index, record) => {
		return <span>{index+1}</span>;
	};

	const jump = openId => {
		model.history.push({
			pathname: '/dataanalysis/projectdata/ua/userscrutinydetails',
			state: {
				openId,
			}
		});
	};

	const renderSecondCell = (column, value, index, record) => {
		return <span style={{cursor:'pointer'}} onClick={jump.bind(this,record[column])}>{record[column]}</span>
	};

	const renderTitle = () => {
		if (columns.length === 0) {
			return null;
		}
		const newColumns = shareds.map(item => columns[item]);
		newColumns.push('参数列表');
		return newColumns.map((item, index) => {
			if (index === 0) {
				return <Table.Column key={index} title={item} cell={renderFirstCell} lock='left' width={80} />
			}
			if (index === 2) {
				return <Table.Column key={index} title={item} width={150} cell={renderSecondCell.bind(this,index)} />
			}
			if (index === newColumns.length - 1) {
				return <Table.Column key={index} title={item} dataIndex={index.toString()} width={400} />
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} width={120} />
		});
	};

	const onRefresh = () => {
		updateParameter(parameter);
	};

	const handleData = () => {
		const newColumns = shareds.map(item => columns[item]);
		newColumns.push('参数列表');
		return {
			sheetHeader: newColumns,
			sheetData: assembleData(),
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
					<Table dataSource={assembleData()} hasBorder={false}>
						{renderTitle()}   		
					</Table>
				</Loading>
			</IceContainer>
		</Components.Wrap>
	);
}