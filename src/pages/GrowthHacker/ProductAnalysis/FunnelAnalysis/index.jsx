import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Button,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import Condition from './components/Condition';
import DataDisplay from './components/DataDisplay';

function FunnelAnalysis({
	location,
	history,
}) {
	let initRequest = false;
	let initSave = {
		title: '新建漏斗分析',
		desc: '',
	}
	let initDate = 'day:0';
	let initDateFilter = {};
	let initCondition = {};
	let initOrders = {};
	if (location.state && location.state.boardInfo) {
		const {
			name,
			desc,
			date,
			segmentation_id,
			steps,
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
			steps,
		};
		initOrders = orders || initOrders;
	}

	const saveRef = useRef(null);
	const refDialog = useRef(null);
	const refVariable = useRef(Object.assign({
		type: 'funnel',
		name: '',
		date: initDate,
		orders: initOrders,
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

	const filterChange = (steps) => {
		let flag = false;
		if (steps.length <= 1) {
			flag = true;
		} else {
			flag = steps.some(v => v.values.step === undefined);
		}
		saveRef.current.setButtonStatus(flag);
		refVariable.current.values = steps;
	};

	function assembleParam() {
		if (!refVariable.current.values) {
			return refVariable.current;
		}
		const param = { ...refVariable.current
		};
		delete param.values;
		const temp = refVariable.current.values.map(v => v.values.step);
		param.steps = temp.slice(1, temp.length);
		param.segmentation_id = temp[0];
		return param;
	}

	const onOk = (sucess, fail) => {
		api.createBoard(assembleParam()).then((res) => {
			model.log('成功添加到看板');
			sucess();
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

	const dateChange = (e) => {
		refVariable.current.date = e;
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
		updateParameter({ ...assembleParam(),
			offset: 0,
		});
	};

	return (
		<Components.Wrap>
			<Components.Save ref={saveRef} {...initSave} onSave={onSave} />

			<IceContainer>
				<Components.DateFilter filterChange={dateChange} />	
      			<Condition filterChange={filterChange} initCondition={initCondition} />
      		</IceContainer>

      		<IceContainer>
				<Components.Refresh onClick={onRefresh} style={{marginBottom: '10px'}} />
      			<DataDisplay meta={meta} data={data} loading={loading} />
      		</IceContainer>

      		<Components.BoardDialog onInputChange={onInputChange} onOk={onOk} ref={refDialog} />
    	</Components.Wrap>
	);
}

export default withRouter(FunnelAnalysis);