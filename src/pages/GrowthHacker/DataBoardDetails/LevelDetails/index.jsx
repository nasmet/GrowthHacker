import React, {
	useState,
	useEffect,
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

function LevelDetails({
	location,
}) {
	const boardInfo = location.state.boardInfo;
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [titles, setTitles] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [chartStyle, setChartStyle] = useState({});
	const [date, setDate] = useState('');

	useEffect(() => {
		function getDataBoard() {
			setLoading(true);
			api.getDataBoard({
				chart_id: boardInfo.id,
				trend: {
					limit: config.LIMIT,
					offset: 0,
					date,
				},
			}).then((res) => {
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
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}

		getDataBoard();

		return () => {
			api.cancelRequest();
		};
	}, [date, boardInfo.id]);

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

	const renderColumn = (item, value, index, record) => {
		return (
			<span>{(record[item]*100).toFixed(2)}%</span>
		);
	}

	const renderTitle = () => {
		return titles.map((item, index) => {
			if (index === 3 || index === 6) {
				return <Table.Column key={index} title={item} cell={renderColumn.bind(this, index)} />
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const filterChange = (e) => {
		setDate(e)
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

export default withRouter(LevelDetails);