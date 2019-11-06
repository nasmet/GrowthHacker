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

	const conditionChange = (steps, values) => {
		refSteps.current.steps = steps;
		Object.assign(refVariable.current, values);
		const flag = steps.length !== 0 ? false : true;
		saveRef.current.setButtonStatus(flag);
	};

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
		if (refSteps.current.steps === 0) {
			model.log('步骤不能为空！');
			return;
		}
		Object.assign(refVariable.current, {
			steps: assembleMetrics(refSteps.current.steps)
		});
		updateParameter({ ...refVariable.current,
			offset: 0,
		});
	};

	return (
		<Components.Wrap>
			<Components.Save ref={saveRef} title={title} {...initSave} onSave={onSave} />

			<IceContainer>
				<Components.DateFilter filterChange={dateChange} />	
      			<Condition conditionChange={conditionChange} initCondition={initCondition} />
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