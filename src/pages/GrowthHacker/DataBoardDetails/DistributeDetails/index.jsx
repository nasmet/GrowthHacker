import React, {
	Component,
	useState,
	useEffect
} from 'react';
import {
	Tab,
	Table,
	Loading,
	Pagination
} from '@alifd/next';
import {
	withRouter
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Template from '../Template';

function DistributeDetails({
	location
}) {
	const {
		boardInfo
	} = location.state;

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [titles, setTitles] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [chartStyle, setChartStyle] = useState({});
	const [date, setDate] = useState('');

	function getDataBoard() {
		setLoading(true);
		api.getDataBoard({
			chart_id: boardInfo.id,
			trend: {
				date,
			}
		}).then((res) => {
			const {
				meta,
				data,
			} = res;
			setTitles(meta);
			setData(assemblingTableData(data));
			setChartStyle(assemblingChartStyle(meta));
			setChartData(assemblingChartData(data, meta));
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		});
	}

	useEffect(() => {
		getDataBoard();

		return () => {
			api.cancelRequest();
		};
	}, [date]);

	function assemblingTableData(data) {
		if(data.length === 0){
			return;
		}
		const row = data.reduce((total, value, index, arr) => {
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
				formatter: v => `${(v*100).toFixed(2)}%`
			},
			tooltip: ['event*count', (event, count) => {
				return {
					name: event,
					value: `${(count*100).toFixed(2)}%`,
				};
			}],
		};
	}

	function assemblingChartData(arg, meta) {
		const arr = [];
		arg.forEach((item, index) => {
			const value = item[0];
			const count = item[1];
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
		return titles.map((item, index) => {
			if (index > 1) {
				return <Table.Column key={index} title={item} cell={renderColumn.bind(this, index)} />
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const filterChange = (e) => {
		setDate(e);
	};

	return (
		<Components.Wrap>
			<Components.Title title={boardInfo.name} desc={boardInfo.desc} />
			<IceContainer>
				<Components.DateFilter initTabValue='NAN' initCurDateValue={model.transformDate(boardInfo.date)} filterChange={filterChange} />	
				<Template 
					tableData={data}
					loading={loading}
					chartData={chartData} 
					chartStyle={chartStyle}
					renderTitle={renderTitle} 
				/>
			</IceContainer>
		</Components.Wrap>
	);
}

export default withRouter(DistributeDetails);