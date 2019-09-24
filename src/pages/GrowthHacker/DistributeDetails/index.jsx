import React, {
	Component,
	useState,
	useEffect
} from 'react';
import {
	Tab,
	Table,
	Message,
	Loading,
	Pagination
} from '@alifd/next';
import {
	withRouter
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Template from '../Template';

const {
	Column
} = Table;
const limit = 10;
const {
	Item
} = Tab;

function DistributeDetails({
	location
}) {
	const {
		projectId,
		boardInfo
	} = location.state;
	const {
		id,
	} = boardInfo;

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [sort, setSort] = useState({});
	const [titles, setTitles] = useState([]);
	const [showType, setShowType] = useState('0');
	const [chartData, setChartData] = useState([]);
	const [chartStyle, setChartStyle] = useState({});
	let cancelTask = false; // 防止内存泄漏

	function getDataBoard() {
		setLoading(true);
		api.getDataBoard({
			project_id: projectId,
			chart_id: id,
			limit: 20,
			offset: 0,
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			const {
				meta,
				data,
			} = res;
			if (data.length === 0) {
				return;
			}
			const tableData = assemblingTableData(data);
			setTitles(meta);
			setData(tableData);
			setChartStyle(assemblingChartStyle(meta));
			setChartData(assemblingChartData(data, meta));
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});
	}

	useEffect(() => {
		getDataBoard();

		return () => {
			cancelTask = true;
		};
	}, []);

	function assemblingTableData(data) {
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
				return <Column key={index} title={item} cell={renderColumn.bind(this, index)} />
			}
			return <Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	return (
		<Template 
			tableData={data}
			loading={loading}
			boardInfo={boardInfo} 
			chartData={chartData} 
			chartStyle={chartStyle}
			renderTitle={renderTitle} 
		/>
	);
}

export default withRouter(DistributeDetails);