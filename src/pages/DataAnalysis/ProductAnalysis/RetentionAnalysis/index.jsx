import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Button,
	Table,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Condition from './components/Condition';

function RetentionAnalysis({
	location,
	history,
}) {
	const {
		chartId,
		initSave,
		initTitle,
		initCondition,
		initDate,
		initDateFilter,
		initOrders,
	} = model.initAnalysisData(3, location);

	const [title, setTitle] = useState(initTitle);
	const saveRef = useRef(null);
	const refDialog = useRef(null);
	const refVariable = useRef(Object.assign({
		chartId,
		type: 'retention',
		name: initTitle,
		date: initDate,
		orders: initOrders,
	}, initCondition));
	const refStep = useRef({
		steps: [],
		status: false,
	});

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

	function getStatus() {
		if (!refStep.current.steps[0].values.init_event) {
			return false;
		}
		return true;
	}

	const onRefresh = utils.debounce(() => {
		if (refStep.current.status) {
			Object.assign(refVariable.current, {
				init_event: refStep.current.steps[0].values.init_event,
				retention_event: refStep.current.steps[1].values.retention_event,
				segmentation_id: refStep.current.steps[2].values.segmentation_id,
			});
			updateParameter({ ...refVariable.current
			});
		}
	}, 1000);

	const conditionChange = steps => {
		refStep.current.steps = steps;
		refStep.current.status = getStatus();
		saveRef.current.setButtonStatus(!refStep.current.status);
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

	function assemblingChartStyle(meta) {
		return {
			x: meta[0],
			y: 'count',
			color: 'event',
			cols: {
				[meta[0]]: {
					type: 'timeCat',
				},
			},
		};
	}

	function assemblingChartData(data, meta) {
		const arr = [];
		data.forEach((item) => {
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
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<span>{record[item]}</span>
				<span style={{color:'#0AA372'}}>
					{record[1]===0?'0.00%':utils.transformPercent(record[item]/record[1])}
				</span>
			</div>
		);
	}

	const renderTitle = () => {
		return meta.map((item, index) => {
			if (index > 1) {
				return <Table.Column key={index} title={item} cell={renderColumn.bind(this, index)} width={100} />
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} lock={data.length===0?false:true} width={120} />
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
				{data.length > 0 &&
					<div className={styles.btnWrap}>					
						<Components.Refresh onClick={onRefresh} />
						<Components.ExportExcel fileName={title} data={data} meta={meta} type={2} />
					</div>
				}	

				<Components.ChartsDisplay 
					tableData={data}
					loading={loading}
					chartData={assemblingChartData(data, meta)} 
					chartStyle={assemblingChartStyle(meta)}
					renderTitle={renderTitle}
				/>
			</IceContainer>

			<Components.BoardDialog onInputChange={onInputChange} onOk={onOk} ref={refDialog} />
    	</Components.Wrap>
	);
}


export default withRouter(RetentionAnalysis);