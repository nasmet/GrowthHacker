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
import * as distributeDetailsConfig from './distributeDetailsConfig';

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
		name,
		desc
	} = boardInfo;
	const info = [{
		id: 0,
		name: '看板名称',
		value: name
	}, {
		id: 1,
		name: '看板描述',
		value: desc
	}, ];

	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [sort, setSort] = useState({});
	const [titles, setTitles] = useState([]);
	const [showType, setShowType] = useState('0');
	const [chartData, setChartData] = useState([]);
	const [chartStyle, setChartStyle] = useState({});
	let cancelTask = false; // 防止内存泄露

	useEffect(() => {
		function fetchData() {
			setLoading(true);
			api.getDataBoard({
				project_id: projectId,
				chart_id: id,
				limit,
				offset: (curPage - 1) * limit,
			}).then((res) => {
				if (cancelTask) return;
				const {
					meta,
					data,
					total
				} = res;
				setCount(total);
				setTitles(meta);
				setData(data);
				setChartStyle(assemblingChartStyle(meta));
				setChartData(assemblingChartData(data, meta));
			}).catch((e) => {
				Message.success(e ? e.toString() : '网络繁忙');
			}).finally(() => {
				if (cancelTask) return;
				setLoading(false);
			});
		}

		if (curPage > 0) {
			fetchData();
		}

		return () => {
			cancelTask = true;
		};
	}, [curPage]);

	function assemblingChartStyle(meta) {
		return {
			x: meta[0].key,
			y: 'count',
			color: 'event'
		};
	}

	function assemblingChartData(arg, meta) {
		const arr = [];
		arg.forEach((item) => {
			const value = item[0];
			const {
				name,
				key
			} = meta[0];
			item.forEach((v, index) => {
				if (index !== 0 && meta[index]) {
					arr.push({
						[key]: `${name}${value}`,
						event: meta[index].name,
						count: v,
					});
				}
			})
		});
		return arr;
	}

	const onSort = (dataIndex, order) => {
		setSort({
			[dataIndex]: order
		});
		// resetPage();
	};

	function resetPage() {
		if (curPage === 1) {
			setCurPage(0);
		}
		setTimeout(() => {
			setCurPage(1);
		});
	}

	const pageChange = (e) => {
		setCurPage(e);
	};

	const renderTitle = () => {
		return titles.map((item, index) => {
			const {
				id,
				name,
				key
			} = item;
			return <Column key={id} title={name} dataIndex={index.toString()} sortable={true} />
		});
	};

	const renderTable = () => {
		return (
			<Table dataSource={data} hasBorder={false} onSort={onSort} sort={sort}>
			   	{renderTitle()}     		
			</Table>
		);
	};

	const rendTabComponent = (key) => {
		switch (key) {
			case '0':
				return renderTable();
			case '1':
				return <Components.BasicPolyline data={chartData} forceFit {...chartStyle} />
			case '2':
				return <Components.BasicColumn data={chartData} forceFit {...chartStyle} />
			case '3':
				return <Components.BasicColumn data={chartData} forceFit transpose {...chartStyle} />
			default:
				return null;
		};
	};

	const renderTab = () => {
		return distributeDetailsConfig.chartTypes.map((item) => {
			const {
				name,
				key
			} = item;
			return (
				<Item key={key} title={name}>
	        		<Loading visible={loading} inline={false}>
	        			<IceContainer>{rendTabComponent(key)}</IceContainer>  
					</Loading>
        		</Item>
			);
		});
	};

	return (
		<div>
			<Components.Introduction info={info} />
			<Tab defaultActiveKey="0">{renderTab()}</Tab>
      		<Pagination 
      			className={styles.pagination} 
      			current={curPage}
            	total={count}
            	onChange={pageChange}
		    />
		</div>
	);
}

export default withRouter(DistributeDetails);