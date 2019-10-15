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
import styles from './index.module.scss';
import Filter from './components/Filter';

function RetentionAnalysis({
	history,
}) {
	const [loading, setLoading] = useState(false);
	const [showDialog, setShowDialog] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [name, setName] = useState('');
	const [values, setValues] = useState({});
	const [submitDisabled, setSubmitDisabled] = useState(true);

	useEffect(() => {
		return () => {
			api.cancelRequest();
		};
	}, []);

	const filterChange = (value, flag) => {
		setDisabled(flag)
		setValues(value);
	};

	const onClose = () => {
		setShowDialog(false);
	};

	const onOK = () => {
		setLoading(true);
		api.createBoard({ ...values,
			name,
			type: 'retention'
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

	return (
		<Components.Wrap>
			<p className={styles.titleWrap}>
				<span className={styles.title}>新建留存分析</span>
				<Button type='primary' disabled={disabled} onClick={onSave}>保存</Button>
			</p>
      		<Filter filterChange={filterChange} />
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