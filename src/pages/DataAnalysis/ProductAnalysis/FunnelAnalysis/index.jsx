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
		chartId,
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
		chartId,
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
	} = hooks.useRequest(api.getDataBoard, refVariable.current, false);
	const {
		meta = [],
			data = [],
			total = 0,
	} = response;

	const onOk = (sucess, fail) => {
		api.createBoard(refVariable.current).then((res) => {
			refVariable.current.chartId = res.id;
			model.log('成功添加到看板');
			sucess();
			setTitle(refVariable.current.name);
		}).catch((e) => {
			model.log(e);
			fail();
		});
	};

	// 筛选条件是否可点击状态
	function getStatus(steps) {
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
				steps: assembleMetrics(refSteps.current.steps)
			});
			updateParameter({ ...refVariable.current,
				offset: 0,
			});
		}
	}, 1000);

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
						values: item.values.value.split(','),
					}))
				},
			}
		})
	}

	const handleData = () => {
		const sheetHeader = meta.map((item, index) => {
			if (index === 0) {
				return item.step_name;
			}
			if (index === meta.length - 1) {
				return '';
			}
			return item.step_num;
		});
		const temp = data.map(item => `${item.unique_count}\n${utils.transformPercent(item.percentage)}`);
		return {
			sheetHeader,
			sheetData: [temp],
		};
	};

	return (
		<Components.Wrap>
			<Components.Save ref={saveRef} title={title} {...initSave} onSave={onSave} />

			<IceContainer>
				<Components.DateFilter filterChange={dateChange} {...initDateFilter} />	
      			<Condition conditionChange={conditionChange} initCondition={initCondition} />
      		</IceContainer>

      		<IceContainer>
      			<div className='table-update-btns'>
					<Components.Refresh onClick={onRefresh} />
					{data.length > 0 && <Components.ExportExcel fileName={title} handle={handleData} />}
				</div>
      			<DataDisplay meta={meta} data={data} loading={loading} />
      		</IceContainer>

      		<Components.BoardDialog onInputChange={onInputChange} onOk={onOk} ref={refDialog} />
    	</Components.Wrap>
	);
}

export default withRouter(FunnelAnalysis);