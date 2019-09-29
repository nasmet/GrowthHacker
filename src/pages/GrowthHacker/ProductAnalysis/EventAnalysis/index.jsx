import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Tab,
	Table,
	Message,
	Loading,
	Pagination,
	Balloon,
	DatePicker,
	Button,
	Dialog,
	Input,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import moment from 'moment';
import styles from './index.module.scss';
import * as eventAnalysisConfig from './eventAnalysisConfig';
import Filter from './components/Filter';

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

function EventAnalysis() {
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [sort, setSort] = useState({});
	const [titles, setTitles] = useState([]);
	const [showType, setShowType] = useState('0');
	const [chartData, setChartData] = useState([]);
	const [chartStyle, setChartStyle] = useState({});
	const [showDialog, setShowDialog] = useState(false);
	const [value, setValue] = useState('');
	const [dialogLoading, setDialogLoading] = useState(false);
	const [values, setValues] = useState({});
	let cancelTask = false; // 防止内存泄漏
	const projectId = sessionStorage.getItem('projectId');

	useEffect(() => {
		return () => {
			cancelTask = true;
		};
	}, [curPage]);

	function assemblingChartData(arg, meta) {
		const arr = [];
		arg.forEach((item) => {
			const value = item[0];
			const {
				name,
				key,
			} = meta[0];
			item.forEach((v, index) => {
				if (index !== 0 && meta[index]) {
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
				key,
			} = item;
			return <Column key={id} title={name} dataIndex={index.toString()} sortable={true} />
		})
	};

	const renderTab = () => {
		return eventAnalysisConfig.chartTypes.map((item) => {
			const {
				name,
				key,
			} = item;
			return (
				<Item 
					key={key}
          			title={name}
        		/>
			);
		});
	};

	const tabChange = (e) => {
		setShowType(e);
	};

	const renderTable = () => {
		return (
			<Table 
				dataSource={data} 
				hasBorder={false} 
				onSort={onSort} 
				sort={sort}
			>
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

	const onDateChange = (e) => {
		if (e.length === 2 && e[1]) {

		}
	};

	const filterChange = (e) => {
		setValues(e);
	};

	const onClose = () => {
		setShowDialog(false);
	};

	const onOK = () => {
		setDialogLoading(true);
		api.createBoard({
			id: projectId,
			trend: { ...values,
				name: value,
				type: 'dashboard'
			}
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			Message.success('成功添加到看板');
			setShowDialog(false);
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			setDialogLoading(false);
		});
	};

	const onInputChange = (e) => {
		setValue(e);
	};

	const onSave = () => {
		setShowDialog(true);
	};

	return (
		<div className={styles.wrap}>
			<p className={styles.titleWrap}>
				<span className={styles.title}>新建事件分析</span>
				<Button type='primary' onClick={onSave}>保存</Button>
			</p>
			<IceContainer>
				<Filter filterChange={filterChange} />
			</IceContainer>
			{/*
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
	    	</IceContainer>*/}
	    	<Dialog autoFocus visible={showDialog} onClose={onClose} footer={false}>
      			<Loading visible={dialogLoading} inline={false}>
					<div style={{margin:'20px'}}>
						<p className={styles.name}>请输入看板名称</p>
						<Input onChange={onInputChange} style={{marginBottom:'20px'}} />
						<div>
							<Button type='primary' onClick={onOK} style={{marginRight:'20px'}}>确定</Button>
							<Button onClick={onClose}>取消</Button>
						</div>
					</div>
				</Loading>	
			</Dialog>	
    	</div>
	);
}

export default withRouter(EventAnalysis);