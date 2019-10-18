import React, {
	Component,
	useState,
	useEffect
} from 'react';
import {
	Tab,
	Table,
	Loading
} from '@alifd/next';
import {
	withRouter
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Template from '../Template';

function RetentionDetails({
	location,
}) {
	const {
		boardInfo,
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
			setData(data);
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
					{record[1]===0?'0.00%':utils.transformPercent(record[item]/record[1])}
				</span>
			</div>
		);
	}

	const renderTitle = () => {
		return titles.map((item, index) => {
			if (index > 1) {
				return <Table.Column key={index} title={item} cell={renderColumn.bind(this, index)} width={100} />
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} lock width={120} />
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

export default withRouter(RetentionDetails);