import React, {
	useState,
	useEffect,
} from 'react';
import {
	Table,
	Pagination,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Template from '../Template';

function EventAnalysisDetails({
	location,
}) {
	const boardInfo = location.state.boardInfo;
	const [count, setCount] = useState(0);
	const [curPage, setCurPage] = useState(1);
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
					offset: (curPage - 1) * config.LIMIT,
					limit: config.LIMIT,
					date,
				},
			}).then((res) => {
				const {
					meta,
					data,
					total,
				} = res;
				setCount(total);
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
	}, [curPage, date, boardInfo.id]);

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
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const pageChange = (e) => {
		setCurPage(e);
	};

	const filterChange = (e) => {
		setCurPage(1);
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
				<Pagination
					className={styles.pagination}
					current={curPage}
					total={count}
					onChange={pageChange}
				/>		      	
			</IceContainer>      	
		</Components.Wrap>	
	);
}

export default withRouter(EventAnalysisDetails);