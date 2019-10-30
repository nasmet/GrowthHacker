import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Button,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import Filter from './components/Filter';
import DataDisplay from './components/DataDisplay';

export default function FunnelAnalysis() {
	const displayRef = useRef(null);
	const refDialog = useRef(null);
	const saveRef = useRef(null);
	const refVariable = useRef({
		values: {},
		name: '',
		date: 'day:0',
	});

	useEffect(() => {
		return () => {
			api.cancelRequest();
		};
	}, []);

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

	const onOk = (sucess, fail) => {
		const {
			name,
			date,
			values,
		} = refVariable.current;
		const temp = values.map(v => v.values.step);
		api.createBoard({
			steps: temp.slice(1, temp.length),
			name,
			type: 'funnel',
			segmentation_id: temp[0],
			date,
		}).then((res) => {
			model.log('成功添加到看板');
			sucess();
			displayRef.current.fetchData(res.id);
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

	return (
		<Components.Wrap>
			<Components.Save ref={saveRef} title='新建漏斗分析' onSave={onSave} />

			<IceContainer>
				<Components.DateFilter filterChange={dateChange} />	
      			<Filter filterChange={filterChange} />
      		</IceContainer>

      		<DataDisplay ref={displayRef} />

      		<Components.BoardDialog onInputChange={onInputChange} onOk={onOk} ref={refDialog} />
    	</Components.Wrap>
	);
}