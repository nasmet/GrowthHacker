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

export default function RetentionAnalysis() {
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

	const filterChange = (step) => {
		const flag = step.length === 0 ? true : false;
		if (flag !== disabled) {
			setDisabled(flag);
		}
		refVariable.current.values = step;
	};

	const tranformData = () => {
		const values = refVariable.current.values;
		return {
			init_event: values[0].values.init_event,
			retention_event: values[1].values.retention_event,
			segmentation_id: values[2].values.segmentation_id,
		}
	};

	const onOk = (sucess, fail) => {
		const temp = tranformData();
		const {
			name,
			date,
		} = refVariable.current;
		api.createBoard({ ...temp,
			name,
			type: 'retention',
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
				<span className={styles.title}>新建留存分析</span>
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
