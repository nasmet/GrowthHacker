import React, {
	Component,
	useState,
	useEffect,
	useRef,
	useContext,
	useCallback,
	useMemo,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Table,
	Message,
	Loading,
	Icon,
	Pagination,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import * as retentionDetailsConfig from './retentionDetailsConfig';

const {
	Column,
} = Table;
const limit = 20;
const {
	Item,
} = Tab;

function RetentionDetails({
	location,
}) {
	const {
		projectId,
		boardInfo,
	} = location.state;
	const {
		id,
		name,
		desc,
	} = boardInfo;
	const info = [{
		id: 0,
		name: '看板名称',
		value: name,
	}, {
		id: 1,
		name: '看板描述',
		value: desc,
	}];

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
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
				offset: 0,
			}).then((res) => {
				if (cancelTask) {
					return;
				}
				const {
					meta,
					data,
				} = res;
				setTitles(meta);
				setData(data);
				setChartStyle(assemblingChartStyle(meta));
				setChartData(assemblingChartData(data, meta));
			}).catch((e) => {
				Message.success(e ? e.toString() : '网络繁忙');
			}).finally(() => {
				if (cancelTask) {
					return;
				}
				setLoading(false);
			});
		}

		fetchData();

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
			}
		}
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
				<span style={{color:'#0AA372'}}>{(record[item]/record[1]*100).toFixed(2)}%</span>
			</div>
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

	const renderTable = () => {
		return (
			<Table 
				dataSource={data} 
				hasBorder={false} 
			>
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
		return retentionDetailsConfig.chartTypes.map((item) => {
			const {
				name,
				key,
			} = item;
			return (
				<Item 
					key={key}
          			title={name}
        		>
	        		<Loading visible={loading} inline={false}>
	        			<IceContainer>
							{rendTabComponent(key)}
						</IceContainer>  
					</Loading>
        		</Item>
			);
		});
	};

	return (
		<div>
			<Components.Introduction info={info} />
			<Tab defaultActiveKey="0">
	      		{renderTab()}
	      	</Tab>
		</div>
	);
}

export default withRouter(RetentionDetails);