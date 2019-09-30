import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Table,
	Message,
	Loading,
	Pagination,
	Icon,
	Dialog,
	Select,
	Grid,
	DatePicker,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Template from '../Template';

const {
	Column
} = Table;
const {
	Item
} = Tab;

function EventAnalysisDetails({
	location,
}) {
	const {
		projectId,
		boardInfo
	} = location.state;
	const {
		id,
		dimensions,
	} = boardInfo;

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
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
				data
			} = res;
			if (data.length === 0) {
				return;
			}
			setTitles(meta);
			setData(data);
			if (dimensions.length < 2) {
				setChartStyle(assemblingChartStyle(meta));
				setChartData(assemblingChartData(data, meta));
			}
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			};
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
						[name]: `${name}${value}`,
						event: meta[index],
						count: v,
					})
				}
			})
		});
		return arr;
	}

	const renderTitle = () => {
		return titles.map((item, index) => {
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

export default withRouter(EventAnalysisDetails);