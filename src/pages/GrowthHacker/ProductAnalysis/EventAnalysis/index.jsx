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
}) {
	let initValues = {};
	let initDateFilter = {};
	let initSave = {
		title: '新建事件分析',
		desc: '',
	}
	let initRequest = false;
	let initChartId = 0;
	let initDate = 'day:0';

	function init() {
		if (location.state && location.state.boardInfo) {
			const {
				name,
				desc,
				id,
				date,
				segmentation_id,
				metrics,
				dimensions,
			} = location.state.boardInfo;
			initValues = {
				segmentation_id,
				dimensions,
				metrics,
			};
			initDateFilter = {
				initTabValue: 'NAN',
				initCurDateValue: model.transformDate(date)
			};
			initSave.title = name;
			initSave.desc = desc;
			initSave.disable = false;
			initRequest = true;
			initChartId = id;
			initDate = date;
		}
	}

	init();

	const saveRef = useRef(null);
	const refDialog = useRef(null);
	const refVariable = useRef({
		values: initValues,
		name: '',
		date: initDate,
	});

	const {
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getDataBoard, {
		chart_id: initChartId,
		trend: {
			date: initDate,
			limit: config.LIMIT,
			offset: 0,
		},
	}, initRequest);
	const {
		meta = [],
			data = [],
			total = 0,
	} = response;

	const conditionChange = (value, flag) => {
		refVariable.current.values = value;
		saveRef.current.setButtonStatus(flag);
	};

	const onOk = (success, fail) => {
		const {
			values,
			date,
			name,
		} = refVariable.current;
		api.createBoard({ ...values,
			name,
			type: 'dashboard',
			date,
		}).then((res) => {
			model.log('成功添加到看板');
			success();
			updateParameter(utils.deepObject(parameter, {
				chart_id: res.id,
				trend: {
					date,
				}
			}));
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
		return {
			x: meta[0],
			y: 'count',
			color: 'event',
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
						[name]: `${name}${value}`,
						event: meta[index],
						count: v,
					})
				}
			})
		});
		return arr;
	}

	const renderTitle = () => {
		return meta.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const pageChange = (e) => {
		updateParameter(utils.deepObject(parameter, {
			trend: {
				offset: (e - 1) * config.LIMIT,
			}
		}));
	};

	const dateChange = (e) => {
		if (initRequest) {
			updateParameter(utils.deepObject(parameter, {
				trend: {
					date: e,
				}
			}));
		}
		refVariable.current.date = e;
	};

	const filterChange = e => {

	};

	return (
		<Components.Wrap>
			<Components.Save ref={saveRef} {...initSave} onSave={onSave} />

			<IceContainer>
				<Components.DateFilter filterChange={dateChange} {...initDateFilter} />	
				<Condition filterChange={conditionChange} initValues={initValues} />
				<Filter filterChange={filterChange} />
			</IceContainer>

			<IceContainer style={{minHeight: '600px'}}>
				<Components.ChartsDisplay
					tableData={data}
					loading={loading}
					chartData={assemblingChartData(data, meta)} 
					chartStyle={assemblingChartStyle(meta)}
					renderTitle={renderTitle} 
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