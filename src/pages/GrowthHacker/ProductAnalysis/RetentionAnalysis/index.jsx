import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Loading,
	Button,
	Dialog,
	Input,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Filter from './components/Filter';

function RetentionAnalysis({
	history,
}) {
	const [loading, setLoading] = useState(false);
	const [showDialog, setShowDialog] = useState(false);
	const [name, setName] = useState('');
	const [values, setValues] = useState({});
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const [date, setDate] = useState('day:0');

	useEffect(() => {
		return () => {
			api.cancelRequest();
		};
	}, []);

	const filterChange = (value) => {
		setValues(value);
	};

	const onClose = () => {
		setShowDialog(false);
	};

	const tranformData = () => {
		return {
			init_event: values[0].values.init_event,
			retention_event: values[0].values.retention_event,
			segmentation_id: values[0].values.segmentation_id,
		}
	};

	const onOK = () => {
		setLoading(true);
		const temp = tranformData();
		api.createBoard({ ...temp,
			name,
			type: 'retention',
			date,
		}).then((res) => {
			model.log('成功添加到看板');
			history.push('/growthhacker/projectdata/db');
		}).catch((e) => {
			model.log(e);
			setLoading(false);
		});
	};

	const onInputChange = (e) => {
		if (e) {
			setSubmitDisabled(false);
		} else {
			setSubmitDisabled(true);
		}
		setName(e);
	};

	const onSave = () => {
		setSubmitDisabled(true);
		setShowDialog(true);
	};

	const dateChange = (e) => {
		setDate(e)
	};

	return (
		<Components.Wrap>
			<p className={styles.titleWrap}>
				<span className={styles.title}>新建留存分析</span>
				<Button type='primary' onClick={onSave}>保存</Button>
			</p>
			<IceContainer>
				<Components.DateFilter filterChange={dateChange} />	
				<Filter filterChange={filterChange} />
			</IceContainer>
			<Dialog autoFocus visible={showDialog} onClose={onClose} footer={false}>
      			<Loading visible={loading} inline={false}>
					<div style={{margin:'20px'}}>
						<p className={styles.name}>请输入看板名称</p>
						<Input onChange={onInputChange} style={{marginBottom:'20px'}} />
						<div>
							<Button type='primary' disabled={submitDisabled} onClick={onOK} style={{marginRight:'20px'}}>确定</Button>
							<Button onClick={onClose}>取消</Button>
						</div>
					</div>
				</Loading>	
			</Dialog>	
    	</Components.Wrap>
	);
}

export default withRouter(RetentionAnalysis);