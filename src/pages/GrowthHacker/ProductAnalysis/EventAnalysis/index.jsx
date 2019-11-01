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
import Filter from './components/Filter';

function EventAnalysis({
	location,
	history,
}) {
	let initRequest = false;
	let initSave = {
		title: '新建事件分析',
		desc: '',
	}
	let initDate = 'day:0';
	let initDateFilter = {};
	let initCondition = {};
	let initFilter = [];
	let initOrders = {};

	if (location.state && location.state.boardInfo) {
		const {
			name,
			desc,
			date,
			segmentation_id,
			metrics,
			dimensions,
			filter,
			orders,
		} = location.state.boardInfo;
		initRequest = true;
		initSave.title = name;
		initSave.desc = desc;
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
		initFilter = filter || initFilter;
		initOrders = orders || initOrders;
	}


	const saveRef = useRef(null);
	const refDialog = useRef(null);
	const refVariable = useRef(Object.assign({
		type: 'dashboard',
		name: '',
		date: initDate,
		orders: initOrders,
		filter: initFilter,
		limit: config.LIMIT,
		offset: 0,
	}, initCondition));

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

	const conditionChange = (value, flag) => {
		Object.assign(refVariable.current, value);
		saveRef.current.setButtonStatus(flag);
	};

	const onOk = (success, fail) => {
		api.createBoard(refVariable.current).then((res) => {
			model.log('成功添加到看板');
			success();
			history.push('/growthhacker/projectdata/db');
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
		updateParameter(Object.assign(refVariable.current, {
			offset: (e - 1) * config.LIMIT,
		}));
	};

	const dateChange = (e) => {
		refVariable.current.date = e;
	};

	const filterChange = e => {
		refVariable.current.filter = e.map(item => item.values);
	};

	const onSort = (dataIndex, order) => {
		refVariable.current.orders = {
			isDim: meta[dataIndex].is_dim,
			index: +dataIndex,
			orderType: order,
		};
		onRefresh();
	};

	function onRefresh() {
		updateParameter({ ...refVariable.current,
			offset: 0,
		});
	};

	return (
		<Components.Wrap>
			<Components.Save ref={saveRef} {...initSave} onSave={onSave} />

			<IceContainer>
				<Components.DateFilter filterChange={dateChange} {...initDateFilter} />	
				<Condition filterChange={conditionChange} initValues={initCondition} />
				<Filter filterChange={filterChange} initFilter={initFilter} />
			</IceContainer>

			<IceContainer style={{minHeight: '600px'}}>
				<Components.ChartsDisplay
					tableData={data}
					loading={loading}
					meta={meta}
					chartData={assemblingChartData(data, meta)} 
					chartStyle={assemblingChartStyle(meta)}
					renderTitle={renderTitle}
					onSort={onSort} 
					showBtn
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