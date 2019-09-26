import React, {
	Component,
	useState,
	useEffect
} from 'react';
import {
	Tab,
	Table,
	Message,
	Loading
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

function RetentionDetails({
	location,
}) {
	const {
		projectId,
		boardInfo,
	} = location.state;
	const {
		id,
	} = boardInfo;

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [titles, setTitles] = useState([]);
	const [showType, setShowType] = useState('0');
	const [chartData, setChartData] = useState([]);
	const [chartStyle, setChartStyle] = useState({});
	let cancelTask = false; // 防止内存泄露

	function getDataBoard() {
		setLoading(true);
		api.getDataBoard({
			project_id: projectId,
			chart_id: id,
			limit: 20,
			offset: 0,
		}).then((res) => {
			if (cancelTask) return;
			const {
				meta,
				data,
			} = res;
			if (data.length === 0) {
				return;
			}
			setTitles(meta);
			setData(data);
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

	function assemblingChartStyle(meta) {
		return {
			x: meta[0],
			y: 'count',
			color: 'event',
			cols: {
				[meta[0]]: {
					type: 'timeCat',
				}
			},
		};
	}

	function assemblingChartData(arg, meta) {
		const arr = [];
		arg.forEach((item) => {
			const value = item[0];
			const name = meta[0];
			item.forEach((v, index) => {
				if (index !== 0 && meta[index]) {
					arr.push({
						[name]: value,
						event: meta[index],
						count: v,
					})
				}
			})
		});
		return arr;
	}

	const renderColumn = (item, value, index, record) => {
		return (
			<div className={styles.source}>
				<span>{record[item]}</span>
				<span style={{color:'#0AA372'}}>
					{(record[item]/record[1]*100).toFixed(2)}%
				</span>
			</div>
		);
	}

	const renderTitle = () => {
		return titles.map((item, index) => {
			if (index > 1) {
				return <Column key={index} title={item} cell={renderColumn.bind(this, index)} width={100} />
			}
			return <Column key={index} title={item} dataIndex={index.toString()} lock width={100} />
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

export default withRouter(RetentionDetails);