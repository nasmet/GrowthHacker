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
	Pagination,
	Icon,
	Balloon,
	Checkbox,
	DatePicker,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import moment from 'moment';
import styles from './index.module.scss';
import Filter from './components/Filter';
import templateConfig from './templateConfig';

moment.locale('zh-cn');
const {
	RangePicker,
} = DatePicker;
const {
	Column,
} = Table;
const limit = 10;
const {
	Item,
} = Tab;

function Template({
	type,
}) {
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [sort, setSort] = useState({});
	const [filter, setfilter] = useState({});
	const [titles, setTitles] = useState([]);
	const [showType, setShowType] = useState('0');
	const [chartData, setChartData] = useState([]);
	const [chartStyle, setChartStyle] = useState({});

	let cancelTask = false; // 防止内存泄露
	useEffect(() => {
		function fetchData() {
			setLoading(true);
			api.getDataBoard({
				project_id: '1',
				chart_id: type,
				limit,
				offset: (curPage - 1) * limit,
			}).then((res) => {
				if (cancelTask) {
					return;
				}
				console.log(res);
				const {
					meta,
					data,
					total,
				} = res;
				setCount(total);
				setTitles(meta);
				setData(data);
				if (type !== '3') {
					setChartStyle({
						x: meta[0].key,
						y: 'count',
						color: 'event',
					})
					setChartData(assemblingChartData(data, meta));
				}
			}).catch((e) => {
				Message.success(e.toString());
			}).finally(() => {
				if (cancelTask) {
					return;
				}
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

	function assemblingChartData(arg, meta) {
		const arr = [];
		arg.forEach((item) => {
			const value = item[0];
			const name = meta[0].name;
			const key = meta[0].key;
			item.forEach((v, index) => {
				if (index !== 0) {
					arr.push({
						[key]: `${name}${value}`,
						event: meta[index].name,
						count: v,
					})
				}
			})
		});
		return arr;
	}

	const onSort = (dataIndex, order) => {
		setSort({
			[dataIndex]: order,
		});
		resetPage();
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

	const filterChange = () => {
		console.log(filter);
		setSort({});
		resetPage();
	};

	const renderTitle = () => {
		return titles.map((item, index) => {
			const {
				id,
				name,
				key,
			} = item;
			return <Column key={id} title={name} dataIndex={index.toString()} sortable={true} />
		})
	};

	const renderTab = () => {
		return templateConfig.map((item) => {
			const {
				name,
				key,
			} = item;
			const disabled = (type === '3' && key !== '0') ? true : false;
			return (
				<Item 
					key={key}
          			title={name}
          			disabled={disabled}
        		/>
			);
		});
	};

	const tabChange = (e) => {
		setShowType(e);
	};

	const onDateChange = (e) => {
		if (e.length === 2 && e[1]) {

		}
	};

	const renderTable = () => {
		return (
			<Table dataSource={data} hasBorder={false} onSort={onSort} sort={sort}>
			    {renderTitle()}       		
			</Table>
		);
	};

	const rendShowType = () => {
		switch (showType) {
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

	return (
		<div>
			<IceContainer>
				<Filter values={filter} filterChange={filterChange} />
			</IceContainer>
			<IceContainer>
			    <div className={styles.item}>
	      			<RangePicker 
	      				defaultValue={[moment(),moment()]}
	      				onChange={onDateChange}
	      			/>
	      			<Tab 
	      				className={styles.tabWrap}
	      				defaultActiveKey="0" 
	      				shape="capsule" 
	      				size="small" 
	      				onChange={tabChange}
	      			>
			      		{renderTab()}
			      	</Tab>
	      		</div>

	      		<Loading visible={loading} inline={false}>
	      			{rendShowType()}
	      		</Loading>

	      		<Pagination
	            	className={styles.pagination}
	           		current={curPage}
	            	total={count}
	            	onChange={pageChange}
			    />
	    	</IceContainer>
    	</div>
	);
}

export default withRouter(Template);