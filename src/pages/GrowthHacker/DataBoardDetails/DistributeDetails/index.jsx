import React, {
	useRef,
} from 'react';
import {
	Table,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Template from '../Template';

function DistributeDetails({
	location,
}) {
	const boardInfo = location.state.boardInfo;

	const {
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getDataBoard, {
		chart_id: boardInfo.id,
		trend: {
			date: boardInfo.date,
		},
	});
	const {
		meta = [],
			data = [],
	} = response;

	function assemblingTableData(data) {
		if (data.length < 2) {
			return data;
		}
		const row = data.reduce((total, value) => {
			return total.map((item, index) => item + value[index]);
		});
		row[0] = '总计';
		return [...data, row];
	}

	function assemblingChartStyle(meta) {
		return {
			x: meta[0],
			y: 'count',
			color: 'event',
			yLabel: {
				formatter: v => `${(v*100).toFixed(2)}%`,
			},
			tooltip: ['event*count', (event, count) => {
				return {
					name: event,
					value: `${(count*100).toFixed(2)}%`,
				};
			}],
		};
	}

	function assemblingChartData(data, meta) {
		if (!data || data.length === 0) {
			return [];
		}
		const arr = [];
		data.forEach(item => {
			const value = item[0];
			const name = meta[0];
			item.forEach((v, index) => {
				if (index > 1 && meta[index]) {
					arr.push({
						[name]: `${name}${value}`,
						event: `日期${meta[index]}`,
						count: v,
					});
				}
			})
		});
		return arr;
	}

	const renderColumn = (item, value, index, record) => {
		return (
			<span>{(record[item]*100).toFixed(2)}%</span>
		);
	}

	const renderTitle = () => {
		return meta.map((item, index) => {
			if (index > 1) {
				return <Table.Column key={index} title={item} cell={renderColumn.bind(this, index)} />
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const filterChange = (e) => {
		updateParameter(utils.deepObject(parameter, {
			trend: {
				date: e,
			}
		}));
	};

	return (
		<Components.Wrap>
			<Components.Title title={boardInfo.name} desc={boardInfo.desc} />
			<IceContainer>
				<Components.DateFilter initTabValue='NAN' initCurDateValue={model.transformDate(boardInfo.date)} filterChange={filterChange} />	
				<Template 
					tableData={assemblingTableData(data)}
					loading={loading}
					chartData={assemblingChartData(data, meta)} 
					chartStyle={assemblingChartStyle(meta)}
					renderTitle={renderTitle} 
				/>
			</IceContainer>
		</Components.Wrap>
	);
}

export default withRouter(DistributeDetails);