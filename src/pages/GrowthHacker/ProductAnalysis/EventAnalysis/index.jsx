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
	let initRequest = false;
	let initSave = {};
	let titleName = '新建事件分析';
	let initDate = 'day:0';
	let initDateFilter = {};
	let initCondition = {
		dimensions: [],
		metrics: [],
		segmentation_id: 0,
	};
	let initOrders = {};

	if (location.state && location.state.boardInfo) {
		const {
			name,
			desc,
			date,
			segmentation_id,
			metrics,
			dimensions,
			orders,
		} = location.state.boardInfo;

		initRequest = true;
		titleName = name;
		initSave.disable = false;
		initDate = date || initDate;
		initDateFilter = {
			initTabValue: 'NAN',
			initCurDateValue: model.transformDate(initDate),
		};
		initCondition = {
			segmentation_id,
			dimensions,
			metrics,
		};
		initOrders = orders || initOrders;
	}

	const [title, setTitle] = useState(titleName);
	const saveRef = useRef(null);
	const refDialog = useRef(null);
	const refVariable = useRef(Object.assign({
		type: 'dashboard',
		name: titleName,
		date: initDate,
		orders: initOrders,
		limit: config.LIMIT,
		offset: 0,
	}, initCondition));
	const refSteps = useRef({
		steps: [],
	})

	const {
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getDataBoard, refVariable.current, initRequest);
	const {
		meta = [],
			data = [],
			total = 0,
	} = response;

	const onOk = (success, fail) => {
		api.createBoard(refVariable.current).then((res) => {
			model.log(`已保存看板${refVariable.current.name}`);
			setTitle(refVariable.current.name);
			updateParameter({ ...refVariable.current,
				offset: 0,
			});
			success();
		}).catch((e) => {
			model.log(e);
			fail();
		});
	};

	const onInputChange = (e) => {
		refVariable.current.name = e;
	};

	const onSave = () => {
		refDialog.current.onShow();
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
				if (index !== 0 && meta[index]) {
					arr.push({
						[name]: `${name}${value}`,
						event: meta[index].name,
						count: v,
					})
				}
			})
		});
		return arr;
	}

	const renderTitle = () => {
		return meta.map((item, index) => {
			return <Table.Column key={item.id} title={item.name} dataIndex={index.toString()} sortable />
		});
	};

	const pageChange = (e) => {
		updateParameter({ ...refVariable.current,
			offset: (e - 1) * config.LIMIT,
		});
	};

	const dateChange = (e) => {
		refVariable.current.date = e;
	};

	const conditionChange = (steps, values) => {
		refSteps.current.steps = steps;
		Object.assign(refVariable.current, values);
		const flag = steps.length !== 0 && values.dimensions.length !== 0 ? false : true;
		saveRef.current.setButtonStatus(flag);
	};

	const onSort = (dataIndex, order) => {
		refVariable.current.orders = {
			isDim: meta[dataIndex].is_dim,
			index: +dataIndex,
			orderType: order,
		};
		onRefresh();
	};

	function assembleMetrics(steps) {
		return steps.map(item => {
			const {
				values,
				filters,
			} = item
			const temp = values.event.split(',');
			return {
				aggregator: values.aggregator,
				event_id: +temp[1],
				event_key: temp[0],
				filter: {
					relation: 'and',
					conditions: filters.map(item => ({
						key: item.values.key,
						op: item.values.op,
						values: [item.values.value],
					}))
				},
			}
		})
	}

	function onRefresh() {
		if (refSteps.current.steps === 0) {
			model.log('事件选择不能为空！');
			return;
		}
		if (refVariable.current.dimensions.length === 0) {
			model.log('维度选择不能为空！');
			return;
		}
		Object.assign(refVariable.current, {
			metrics: assembleMetrics(refSteps.current.steps)
		});
		updateParameter({ ...refVariable.current,
			offset: 0,
		});
	};

	return (
		<Components.Wrap>
			<Components.Save ref={saveRef} title={title} {...initSave} onSave={onSave} />

			<IceContainer>
				<Components.DateFilter filterChange={dateChange} {...initDateFilter} />	
				<Condition conditionChange={conditionChange} initCondition={initCondition} />
			</IceContainer>

			<IceContainer style={{minHeight: '600px'}}>
				<div className={styles.btnWrap}>
					<Components.Refresh onClick={onRefresh} />
					{data.length > 0 && <Components.ExportExcel fileName={title} data={data} meta={meta} type={1} />}
				</div>
				<Components.ChartsDisplay
					tableData={data}
					loading={loading}
					meta={meta}
					chartData={assemblingChartData(data, meta)} 
					chartStyle={assemblingChartStyle(meta)}
					renderTitle={renderTitle}
					onSort={onSort} 
					onRefresh={onRefresh}
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