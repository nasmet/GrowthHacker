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
import styles from './index.module.scss';
import Filter from './components/Filter';
import DataDisplay from './components/DataDisplay';

export default function FunnelAnalysis() {
	const [disabled, setDisabled] = useState(true);
	const [boardId, setBoardId] = useState('');
	const refDialog = useRef(null);
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
		if (flag !== disabled) {
			setDisabled(flag);
		}
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
			setBoardId(res.id);
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
			<p className={styles.titleWrap}>
				<span className={styles.title}>新建漏斗分析</span>
				<Button type='primary' disabled={disabled} onClick={onSave}>保存</Button>
			</p>
			<IceContainer>
				<Components.DateFilter filterChange={dateChange} />	
      			<Filter filterChange={filterChange} />
      		</IceContainer>
      		<IceContainer>
      			<DataDisplay id={boardId} />
      		</IceContainer>
      		<Components.BoardDialog onInputChange={onInputChange} onOk={onOk} ref={refDialog} />
    	</Components.Wrap>
	);
}