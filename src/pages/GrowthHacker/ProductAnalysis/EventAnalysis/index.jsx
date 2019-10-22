import React, {
	Component,
	useEffect,
	useState,
	useRef,
} from 'react';
import {
	Button,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Filter from './components/Filter';
import DataDisplay from './components/DataDisplay';

export default function EventAnalysis() {
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

	const filterChange = (value, flag) => {
		refVariable.current.values = value;
		if (flag !== disabled) {
			setDisabled(flag);
		}
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
				<span className={styles.title}>新建事件分析</span>
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
