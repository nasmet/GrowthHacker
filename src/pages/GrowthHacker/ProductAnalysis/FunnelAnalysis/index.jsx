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
}) {
	const {
		initRequest,
		initSave,
		initTitle,
		initCondition,
		initDate,
		initDateFilter,
		initOrders,
	} = model.initAnalysisData(2, location);

	const [title, setTitle] = useState(initTitle);
	const saveRef = useRef(null);
	const refDialog = useRef(null);
	const refVariable = useRef(Object.assign({
		type: 'funnel',
		name: initTitle,
		date: initDate,
		orders: initOrders,
		limit: config.LIMIT,
		offset: 0,
	}, initCondition));
	const refSteps = useRef({
		steps: [],
		status: false,
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

	const onOk = (sucess, fail) => {
		Object.assign(refVariable.current, {
			steps: assembleMetrics(refSteps.current.steps)
		});
		api.createBoard(refVariable.current).then((res) => {
			model.log('成功添加到看板');
			sucess();
			setTitle(refVariable.current.name);
			updateParameter({ ...refVariable.current,
				offset: 0,
			});
		}).catch((e) => {
			model.log(e);
			fail();
		});
	};

	// 筛选条件是否可点击状态
	function getStatus(steps) {
		if(steps.length===0){
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
				if (!filters[j].values.value) {
					return false
				}
			}
		}
		return true;
	}

	const conditionChange = (steps, values) => {
		refSteps.current.steps = steps;
		Object.assign(refVariable.current, values);
		refSteps.current.status = getStatus(steps);
		saveRef.current.setButtonStatus(!refSteps.current.status);
		onRefresh();
	};

	const onInputChange = (e) => {
		refVariable.current.name = e;
	};

	const onSave = () => {
		refDialog.current.onShow();
	};

	const dateChange = (e) => {
		refVariable.current.date = e;
		onRefresh();
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
		if(refSteps.current.status){
			Object.assign(refVariable.current, {
				steps: assembleMetrics(refSteps.current.steps)
			});
			updateParameter({ ...refVariable.current,
				offset: 0,
			});
		}	
	};

	return (
		<Components.Wrap>
			<Components.Save ref={saveRef} title={title} {...initSave} onSave={onSave} />

			<IceContainer>
				<Components.DateFilter filterChange={dateChange} {...initDateFilter} />	
      			<Condition conditionChange={conditionChange} initCondition={initCondition} />
      		</IceContainer>

      		<IceContainer>
      			<DataDisplay meta={meta} data={data} loading={loading} />
      		</IceContainer>

      		<Components.BoardDialog onInputChange={onInputChange} onOk={onOk} ref={refDialog} />
    	</Components.Wrap>
	);
}

export default withRouter(FunnelAnalysis);