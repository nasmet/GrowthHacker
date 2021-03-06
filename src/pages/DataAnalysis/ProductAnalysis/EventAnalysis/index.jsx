import React, {
	Component,
	useEffect,
	useState,
	useRef,
} from 'react';
import {
	Button,
	Pagination,
	Table,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Condition from './components/Condition';

function EventAnalysis({
	location,
}) {
	const {
		chartId,
		initSave,
		initTitle,
		initCondition,
		initDate,
		initDateFilter,
		initOrders,
	} = model.initAnalysisData(1, location);

	const [title, setTitle] = useState(initTitle);
	const saveRef = useRef(null);
	const refDialog = useRef(null);
	const refVariable = useRef(Object.assign({
		chartId,
		type: 'dashboard',
		name: initTitle,
		date: initDate,
		orders: initOrders,
		limit: config.LIMIT,
		offset: 0,
	}, initCondition));
	const refSteps = useRef({
		steps: [],
		status: false,
	});

	const {
		parameter,
		response,
		loading,
		updateParameter,
		updateResponse,
	} = hooks.useRequest(api.getDataBoard, refVariable.current, false);
	const {
		meta = [],
			data = [],
			total = 0,
	} = response;

	const onOk = (success, fail) => {
		api.createBoard(refVariable.current).then((res) => {
			refVariable.current.chartId = res.id;
			model.log(`已保存看板${refVariable.current.name}`);
			setTitle(refVariable.current.name);
			success();
		}).catch((e) => {
			model.log(e);
			fail();
		});
	};

	const onInputChange = (e) => {
		refVariable.current.name = e;
	};

	function modifyBoard() {
		api.modifyBoard(refVariable.current).then((res) => {
			model.log(`已保存看板${refVariable.current.name}`);
		}).catch((e) => {
			model.log(e);
		})
	}

	const onSave = () => {
		if (!refVariable.current.chartId) {
			refDialog.current.onShow();
			return;
		}
		modifyBoard();
	};

	function assemblingChartStyle(meta) {
		if (meta.length === 0) {
			return;
		}
		return {
			x: meta[0].name,
			y: 'count',
			color: 'event',
		};
	}

	function assemblingChartData(data, meta) {
		const arr = [];
		data.forEach((item) => {
			const value = item[0];
			const name = meta[0].name;
			item.forEach((v, index) => {
				if (index !== 0 && meta[index] && v!==null) {
					arr.push({
						[name]: `${name}${value}`,
						event: meta[index].name,
						count: Math.floor(v*100)/100,
					})
				}
			})
		});
		return arr;
	}

	const renderColumn = (column, value, index, record) => {
		return <span>{record[column]===null?'-':record[column]}</span>
	};

	const setHeader=(name,filter)=>{
		return (
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<span>{name}</span>
				{filter.map((item,index)=><span style={{fontSize:'12px',marginLeft:'2px'}} key={index}>{item}</span>)}
			</div>
		);
	}

	const renderTitle = () => {
		return meta.map((item, index) => {
			let name = item.name;
			let filter = [];
			if(!item.is_dim){
				filter = item.filter.conditions;
			} 
			return <Table.Column key={item.id} title={setHeader(name,filter)} dataIndex={index.toString()} cell={renderColumn.bind(this, index)} sortable />
		});

	};

	const pageChange = (e) => {
		updateParameter({ ...refVariable.current,
			offset: (e - 1) * config.LIMIT,
		});
	};

	const dateChange = (e) => {
		refVariable.current.date = e;
		onRefresh();
	};

	// 筛选条件是否可点击状态
	function getStatus(steps, values) {
		if (values.dimensions.length === 0) {
			return false
		}
		if (steps.length === 0) {
			return false;
		}
		for (let i = 0, len = steps.length; i < len; i++) {
			if (!steps[i].values.event) {
				return false
			}
			const filters = steps[i].filters;
			for (let j = 0, length = filters.length; j < length; j++) {
				if (!filters[j].values.key) {
					return false
				}
				if (!filters[j].values.op) {
					return false
				}
				if (!filters[j].values.value) {
					return false
				}
			}
		}
		return true;
	}

	const onRefresh = utils.debounce(() => {
		if (refSteps.current.status) {
			Object.assign(refVariable.current, {
				metrics: assembleMetrics(refSteps.current.steps)
			});
			updateParameter({ ...refVariable.current,
				offset: 0,
			});
		}
	}, 1000);

	const conditionChange = (steps, values) => {
		refSteps.current.steps = steps;
		Object.assign(refVariable.current, values);
		refSteps.current.status = getStatus(steps, values);
		saveRef.current.setButtonStatus(!refSteps.current.status);
		onRefresh();
	};

	const onSort = (dataIndex, order) => {
		data.sort((a,b)=>order==='desc'?b[dataIndex]-a[dataIndex]:a[dataIndex]-b[dataIndex]);
		updateResponse();
	};

	function assembleMetrics(steps) {
		return steps.map(item => {
			const {
				values,
				filters,
			} = item
			const temp = values.event.split(',');
			const obj = {
				event_id: +temp[1],
				event_key: temp[0],
				filter: {
					relation: 'and',
					conditions: filters.map(item => ({
						key: item.values.key,
						op: item.values.op,
						values: item.values.value.split(','),
					}))
				},
			}
			if (values.aggregator.indexOf(',') === -1) {
				obj.aggregator = values.aggregator;
			} else {
				const temp_1 = values.aggregator.split(',');
				obj.aggregator = temp_1[1];
				obj.field = temp_1[0];
			}
			return obj;
		})
	}

	const handleData = () => {
		return {
			sheetHeader: meta.map(item => item.name),
			sheetData: data,
		};
	}
	
	return (
		<Components.Wrap>
			<Components.Save ref={saveRef} title={title} {...initSave} onSave={onSave} />

			<IceContainer>
				<Components.DateFilter filterChange={dateChange} {...initDateFilter} />	
				<Condition conditionChange={conditionChange} initCondition={initCondition} />
			</IceContainer>

			<IceContainer style={{minHeight: '600px'}}>
				<div className='table-update-btns'>
					<Components.Refresh onClick={onRefresh} />
					{data.length > 0 && <Components.ExportExcel fileName={title} handle={handleData} />}
				</div>
				<Components.ChartsDisplay
					tableData={data}
					loading={loading}
					chartData={assemblingChartData(data, meta)} 
					chartStyle={assemblingChartStyle(meta)}
					renderTitle={renderTitle}
					onSort={onSort}
					fixedHeader
				/>
				<Pagination
					className={styles.pagination}
					total={total}
					onChange={pageChange}
				/>		      	
			</IceContainer>

			<Components.BoardDialog onInputChange={onInputChange} onOk={onOk} ref={refDialog} />
    	</Components.Wrap>
	);
}

export default withRouter(EventAnalysis);